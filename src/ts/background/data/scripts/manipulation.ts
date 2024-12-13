import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

import {
    o_schema,
    s_data as s_data_loftyshaky_shared_clean,
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
        update_context_menus = false,
        replace = false,
        transform = false,
        transform_force = false,
        load_settings = false,
        test_actions = false,
        prefs_are_filled = true,
        tabs_permission_granted = false,
        restore_back_up = false,
    }: {
        mode?: 'normal' | 'set_from_storage';
        settings?: i_data.Settings;
        update_context_menus?: boolean;
        replace?: boolean;
        transform?: boolean;
        transform_force?: boolean;
        load_settings?: boolean;
        test_actions?: boolean;
        prefs_are_filled?: boolean;
        tabs_permission_granted?: boolean;
        restore_back_up?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const default_settings: i_data.Settings = test_actions
                ? (s_data.Settings.test_actions as i_data.Settings)
                : (s_data.Settings.defaults as i_data.Settings);
            const settings_before: i_data.Settings = n(settings)
                ? settings
                : (default_settings as i_data.Settings);
            let settings_after: i_data.Settings = cloneDeep(settings_before);

            if (test_actions) {
                data.settings.prefs.current_action_id = s_data.Settings.default_test_action_id;
                data.settings.prefs.main_action_id = s_data.Settings.default_test_action_id;
                settings_after.prefs = data.settings.prefs;
            }

            if (transform) {
                settings_after = await this.transform({
                    settings: settings_after,
                    force: transform_force,
                });

                if (restore_back_up) {
                    settings_after = s_data_loftyshaky_shared_clean.Settings.apply_unchanged_prefs({
                        settings: settings_after,
                    });
                }
            }

            if (tabs_permission_granted) {
                settings_after.prefs.tabs_permission = tabs_permission_granted;
            }

            const settings_were_transformed: boolean = !isEqual(settings_before, settings_after);

            if (
                settings_were_transformed ||
                mode === 'normal' ||
                (mode === 'set_from_storage' && !prefs_are_filled)
            ) {
                await s_data_loftyshaky_shared_clean.Cache.set_settings({
                    settings: settings_after,
                });
                await ext.storage_set(settings_after, replace);
            }

            await this.react_to_settings_change({
                mode,
                update_context_menus,
                load_settings,
                restore_back_up,
            });
        }, 'cot_1001');

    public react_to_settings_change = ({
        mode = 'normal',
        force_set_actions = false,
        update_context_menus = false,
        load_settings = false,
        restore_back_up = false,
    }: {
        mode?: 'normal' | 'set_from_storage';
        force_set_actions?: boolean;
        update_context_menus?: boolean;
        load_settings?: boolean;
        restore_back_up?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            await d_actions.Actions.set({ from_cache: true, force: force_set_actions });

            if (mode === 'set_from_storage' || (mode === 'normal' && update_context_menus)) {
                await s_context_menu.Items.create_itmes();
            }

            s_service_worker.ServiceWorker.make_persistent();
            await s_tab_counter.Badge.set_tab_count();
            await s_data_loftyshaky_shared_clean.Cache.set({
                key: 'updating_settings',
                val: false,
            });

            if (load_settings) {
                await ext.send_msg_resp({ msg: 'load_settings', restore_back_up });
            }
        }, 'cot_1138');

    public update_settings_debounce = debounce(
        (
            settings: i_data.Settings,
            replace: boolean = false,
            update_context_menus: boolean = false,
            transform: boolean = false,
            transform_force: boolean = false,
            load_settings: boolean = false,
        ) =>
            err_async(async () => {
                await this.update_settings({
                    settings,
                    replace,
                    update_context_menus,
                    transform,
                    transform_force,
                    load_settings,
                });

                ext.updating_storage = false;
            }, 'cot_1002'),
        250,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            if (!x.prefs_are_filled() && !x.found_old_settings()) {
                // Runs on extension install, when the prefs object is empty. The prefs object is first set in @loftyshaky/shared.
                await this.update_settings({
                    mode: 'set_from_storage',
                    transform,
                    prefs_are_filled: false,
                });
            } else if (transform) {
                await this.update_settings({
                    mode: 'set_from_storage',
                    settings: data.settings,
                    transform,
                });
            }
        }, 'cot_1003');

    public on_init_set_from_storage = (): Promise<void> =>
        err_async(async () => {
            if (!n(data.updating_settings) || !data.updating_settings) {
                await this.set_from_storage({ transform: true });
            }
        }, 'cot_1117');

    private transform = ({
        settings,
        force = false,
    }: {
        settings: i_data.Settings;
        force?: boolean;
    }): Promise<i_data.Settings> =>
        err_async(async () => {
            const version = d_schema.Schema.get_version_legacy({ settings });

            const transform_items_settings: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    old_key: 'settings',
                    new_key: 'prefs',
                    new_val: settings.settings,
                }),
            ];

            const updated_settings = await d_schema.Schema.transform({
                data_obj: settings,
                version,
                transform_items: transform_items_settings,
                force,
            });

            const transform_items_prefs: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    new_key: 'tabs_permission',
                    new_val: false,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_color_help',
                    new_key: 'color_help_is_visible',
                }),
            ];

            const updated_prefs = await d_schema.Schema.transform({
                data_obj: updated_settings.prefs,
                version,
                transform_items: transform_items_prefs,
                force,
            });

            updated_prefs.version = ext.get_app_version();

            settings.prefs = updated_prefs;

            await d_schema.Schema.replace({ settings });

            return settings;
        }, 'cot_1004');
}

export const Manipulation = Class.get_instance();
