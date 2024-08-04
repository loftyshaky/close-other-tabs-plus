import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { s_data as s_data_loftyshaky, s_service_worker } from '@loftyshaky/shared/shared_clean';
import { d_actions, i_data } from 'shared_clean/internal';
import { s_context_menu, s_data, s_tab_counter } from 'background/internal';

export class Manipulation {
    private static i0: Manipulation;

    public static i(): Manipulation {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage_run_prevented: boolean = false;

    public update_settings = ({
        mode = 'normal',
        settings,
        transform = false,
        replace = false,
        load_settings = false,
        test_actions = false,
        storage_is_empty = false,
    }: {
        mode?: 'normal' | 'set_from_storage';
        settings?: i_data.SettingsWrapped;
        transform?: boolean;
        replace?: boolean;
        load_settings?: boolean;
        test_actions?: boolean;
        storage_is_empty?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const default_settings: i_data.SettingsWrapped = test_actions
                ? (s_data.Data.i().test_actions as i_data.SettingsWrapped)
                : (s_data.Data.i().defaults as i_data.SettingsWrapped);
            const settings_2: i_data.SettingsWrapped = n(settings) ? settings : default_settings;
            let settings_final: i_data.SettingsWrapped = cloneDeep(settings_2);

            if (test_actions) {
                const current_settings: i_data.SettingsWrapped =
                    await s_data_loftyshaky.Cache.i().get_data();
                current_settings.settings.current_action_id =
                    s_data.Data.i().default_test_action_id;
                current_settings.settings.main_action_id = s_data.Data.i().default_test_action_id;

                settings_final.settings = current_settings.settings;
            }

            if (transform) {
                settings_final = await this.transform({ data: settings_final });
            }

            const settings_were_transformed: boolean = !isEqual(settings_2, settings_final);

            if (
                settings_were_transformed ||
                mode === 'normal' ||
                (mode === 'set_from_storage' && storage_is_empty)
            ) {
                await ext.storage_set(settings_final, replace);
                await s_data_loftyshaky.Cache.i().set_data({
                    data: settings_final,
                    replace,
                    non_replaceable_keys: [
                        'updating_settings',
                        'created_initial_context_menus_once',
                    ],
                });
            }

            await d_actions.Actions.i().set({ from_cache: true });

            const session = await we.storage.session.get('created_initial_context_menus_once');

            if (
                mode === 'normal' ||
                (mode === 'set_from_storage' && !n(session.created_initial_context_menus_once))
            ) {
                await s_context_menu.Items.i().create_itmes();

                if (mode === 'set_from_storage') {
                    await we.storage.session.set({ created_initial_context_menus_once: true });
                }
            }

            s_service_worker.ServiceWorker.i().make_persistent({ settings: settings_final });
            await s_tab_counter.Badge.i().set_tab_count();
            await we.storage.session.set({ updating_settings: false });

            if (load_settings) {
                await ext.send_msg_resp({ msg: 'load_settings' });
            }
        }, 'cot_1001');

    public update_settings_debounce = debounce(
        (settings: i_data.SettingsWrapped, transform: boolean = false, replace: boolean = false) =>
            err_async(async () => {
                await this.update_settings({ settings, transform, replace });
            }, 'cot_1002'),
        500,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            if (!n(data.settings.enable_cut_features)) {
                const settings: i_data.SettingsWrapped =
                    await s_data_loftyshaky.Cache.i().get_data();

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
    }: {
        data: i_data.SettingsWrapped;
    }): Promise<i_data.SettingsWrapped> =>
        err_async(
            async () =>
                /*
            const transform_items: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    new_key: 'test_val',
                    new_val: true,
                }),
            ];

            const updated_settings: i_data.Settings = await d_schema.Main.i().transform({
                data: data.settings,
                transform_items,
            });

            data.settings = updated_settings;
               */
                data,
            'cot_1004',
        );
}
