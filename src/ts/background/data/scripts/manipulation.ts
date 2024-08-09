import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import {
    o_schema,
    s_data as s_data_loftyshaky,
    d_schema,
    s_service_worker,
} from '@loftyshaky/shared/shared_clean';
import { d_actions, i_data } from 'shared_clean/internal';
import { s_context_menu, s_data, s_tab_counter } from 'background/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage_run_prevented: boolean = false;

    public update_settings = ({
        mode = 'normal',
        settings,
        transform = false,
        transform_force = false,
        replace = false,
        load_settings = false,
        test_actions = false,
        storage_is_empty = false,
    }: {
        mode?: 'normal' | 'set_from_storage';
        settings?: i_data.SettingsWrapped;
        transform?: boolean;
        transform_force?: boolean;
        replace?: boolean;
        load_settings?: boolean;
        test_actions?: boolean;
        storage_is_empty?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const default_settings: i_data.SettingsWrapped = test_actions
                ? (s_data.Data.test_actions as i_data.SettingsWrapped)
                : (s_data.Data.defaults as i_data.SettingsWrapped);
            const settings_2: i_data.SettingsWrapped = n(settings) ? settings : default_settings;
            let settings_final: i_data.SettingsWrapped = cloneDeep(settings_2);

            if (test_actions) {
                const current_settings: i_data.SettingsWrapped =
                    await s_data_loftyshaky.Cache.get_data();
                current_settings.settings.current_action_id = s_data.Data.default_test_action_id;
                current_settings.settings.main_action_id = s_data.Data.default_test_action_id;

                settings_final.settings = current_settings.settings;
            }

            if (transform) {
                settings_final = await this.transform({
                    data: settings_final,
                    force: transform_force,
                });
            }

            const settings_were_transformed: boolean = !isEqual(settings_2, settings_final);

            if (
                settings_were_transformed ||
                mode === 'normal' ||
                (mode === 'set_from_storage' && storage_is_empty)
            ) {
                await ext.storage_set(settings_final, replace);
                await s_data_loftyshaky.Cache.set_data({
                    data: settings_final,
                    replace,
                    non_replaceable_keys: [
                        'updating_settings',
                        'created_initial_context_menus_once',
                    ],
                });
            }

            await d_actions.Actions.set({ from_cache: true });

            const session = await we.storage.session.get('created_initial_context_menus_once');

            if (
                mode === 'normal' ||
                (mode === 'set_from_storage' && !n(session.created_initial_context_menus_once))
            ) {
                await s_context_menu.Items.create_itmes();

                if (mode === 'set_from_storage') {
                    await we.storage.session.set({ created_initial_context_menus_once: true });
                }
            }

            s_service_worker.ServiceWorker.make_persistent({ settings: settings_final });
            await s_tab_counter.Badge.set_tab_count();
            await we.storage.session.set({ updating_settings: false });

            if (load_settings) {
                await ext.send_msg_resp({ msg: 'load_settings' });
            }
        }, 'cot_1001');

    public update_settings_debounce = debounce(
        (
            settings: i_data.SettingsWrapped,
            transform: boolean = false,
            transform_force: boolean = false,
            replace: boolean = false,
            load_settings: boolean = false,
        ) =>
            err_async(async () => {
                await this.update_settings({
                    settings,
                    transform,
                    transform_force,
                    replace,
                    load_settings,
                });
            }, 'cot_1002'),
        500,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            if (!n(data.settings.enable_cut_features)) {
                const settings: i_data.SettingsWrapped = await s_data_loftyshaky.Cache.get_data();

                if (isEmpty(settings)) {
                    await this.update_settings({
                        mode: 'set_from_storage',
                        transform,
                        storage_is_empty: true,
                    });
                } else if (transform) {
                    await this.update_settings({
                        mode: 'set_from_storage',
                        settings,
                        transform,
                    });
                }
            }
        }, 'cot_1003');

    public on_init_set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const session_data = await we.storage.session.get();

            if (!n(session_data.updating_settings) || !session_data.updating_settings) {
                await this.set_from_storage({ transform: true });
            }
        }, 'cot_1117');

    private transform = ({
        data,
        force = false,
    }: {
        data: i_data.SettingsWrapped;
        force?: boolean;
    }): Promise<i_data.SettingsWrapped> =>
        err_async(async () => {
            const transform_items: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    old_key: 'persistent_service_worker',
                    new_val: true,
                    update_existing_val: true,
                }),
            ];

            const updated_settings: i_data.Settings = await d_schema.Schema.transform({
                data: data.settings,
                transform_items,
                force,
            });

            updated_settings.version = ext.get_app_version();

            data.settings = updated_settings;

            await d_schema.Schema.replace({ data });

            return data;
        }, 'cot_1004');
}

export const Manipulation = Class.get_instance();
