import { runInAction } from 'mobx';

import { s_data } from '@loftyshaky/shared/shared_clean';
import { t, s_theme } from '@loftyshaky/shared/shared';
import { d_optional_permissions } from '@loftyshaky/shared/settings';
import { d_actions, s_css_vars } from 'shared_clean/internal';
import { d_data, s_optional_permissions } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public restore_defaults = (): Promise<void> =>
        err_async(async () => {
            // eslint-disable-next-line no-alert
            const confirmed_restore: boolean = globalThis.confirm(
                ext.msg('restore_defaults_confirm'),
            );

            if (confirmed_restore) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });
                const default_settings_final = s_data.Settings.apply_unchanged_prefs({
                    settings: default_settings,
                });

                await d_data.Manipulation.send_msg_to_update_settings({
                    settings: default_settings_final,
                    replace: true,
                    update_instantly: true,
                    load_settings: true,
                    update_context_menus: true,
                });

                if (n(default_settings_final)) {
                    await d_actions.Actions.set({ settings: default_settings_final });
                }
                s_theme.Theme.set({
                    name: data.settings.prefs.options_page_theme,
                });
                s_css_vars.CssVars.set();
            }
        }, 'cot_1016');

    public restore_back_up = ({ data_objs }: { data_objs: t.AnyRecord[] }): Promise<void> =>
        err_async(async () => {
            await d_data.Manipulation.send_msg_to_update_settings({
                settings: data_objs[0],
                replace: true,
                update_instantly: true,
                transform: true,
                transform_force: true,
                load_settings: true,
                update_context_menus: true,
                restore_back_up: true,
            });
        }, 'cot_1017');

    public restore_back_up_react = (): Promise<void> =>
        err_async(async () => {
            await d_optional_permissions.Permission.show_enable_permissions_notification({
                permissions: [
                    {
                        name: 'tabs',
                        permission:
                            s_optional_permissions.Permissions.optional_permission_checkbox_dict
                                .filter_lists,
                    },
                ],
            });
            const tabs_permission: boolean =
                await s_optional_permissions.Permissions.check_if_contains_tabs_permission();

            runInAction(() =>
                err(() => {
                    data.settings.prefs.tabs_permission = tabs_permission;
                }, 'cot_1131'),
            );

            await d_data.Manipulation.send_msg_to_update_settings({
                settings: data.settings,
                update_instantly: true,
            });

            s_theme.Theme.set({
                name: data.settings.prefs.options_page_theme,
            });
            s_css_vars.CssVars.set();
        }, 'cot_1139');
}

export const Restore = Class.get_instance();
