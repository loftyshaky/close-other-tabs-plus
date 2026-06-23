import { runInAction } from 'mobx';

import { d_optional_permissions } from '@loftyshaky/shared/settings';
import type { t } from '@loftyshaky/shared/shared';
import { s_theme } from '@loftyshaky/shared/shared';
import { d_data, s_optional_permissions } from 'settings/internal';
import type { i_data } from 'shared_clean/internal';
import { d_actions, s_css_vars, s_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public restore_defaults = (): Promise<void> =>
        err_async(async () => {
            //
            const confirmed_restore: boolean = globalThis.confirm(
                ext.msg('restore_defaults_confirm'),
            );

            if (confirmed_restore) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });
                const default_settings_final = s_data.Settings.apply_unchanged_prefs({
                    settings: default_settings as i_data.Settings,
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
                void s_theme.Theme.set({
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
                s_optional_permissions.Permissions.contains_permission.filter_lists;

            runInAction(() =>
                err(() => {
                    data.settings.prefs.tabs_permission = tabs_permission;
                }, 'cot_1131'),
            );

            await d_data.Manipulation.send_msg_to_update_settings({
                settings: x.to_plain(data.settings),
                update_instantly: true,
            });

            void s_theme.Theme.set({
                name: data.settings.prefs.options_page_theme,
            });
            s_css_vars.CssVars.set();
        }, 'cot_1139');
}

export const Restore = Class.get_instance();
