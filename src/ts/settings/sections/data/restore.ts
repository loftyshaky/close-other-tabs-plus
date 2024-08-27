import isEmpty from 'lodash/isEmpty';
import { runInAction } from 'mobx';

import { s_data } from '@loftyshaky/shared/shared_clean';
import { t, s_theme } from '@loftyshaky/shared/shared';
import { d_actions, s_css_vars, i_data } from 'shared_clean/internal';
import { d_data, s_optional_permissions } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public restore_defaults = ({ settings }: { settings?: i_data.Settings } = {}): Promise<void> =>
        err_async(async () => {
            // eslint-disable-next-line no-alert
            const confirmed_restore: boolean = globalThis.confirm(
                ext.msg('restore_defaults_confirm'),
            );

            if (confirmed_restore) {
                const settings_final: i_data.Settings | undefined = await this.set({
                    settings,
                });

                await d_data.Manipulation.send_msg_to_update_settings({
                    settings: settings_final,
                    replace: true,
                    update_instantly: true,
                    load_settings: true,
                    update_context_menus: true,
                });

                if (n(settings_final)) {
                    await d_actions.Actions.set({ settings: settings_final });
                }

                s_theme.Theme.set({
                    name: data.settings.prefs.options_page_theme,
                });
                s_css_vars.CssVars.set();
            }
        }, 'cot_1016');

    public restore_back_up = ({ data_objs }: { data_objs: t.AnyRecord[] }): Promise<void> =>
        err_async(async () => {
            let settings: i_data.Settings | undefined = data_objs[0] as i_data.Settings;
            settings = s_data.Settings.apply_unchanged_prefs({ settings });

            const tabs_permission: boolean =
                await s_optional_permissions.Permissions.set_on_back_up_restore({
                    tabs_permission: n(settings.prefs.tabs_permission)
                        ? settings.prefs.tabs_permission
                        : false,
                });

            settings.prefs.tabs_permission = tabs_permission;

            settings = await this.set({ settings });

            await d_data.Manipulation.send_msg_to_update_settings({
                settings,
                replace: true,
                update_instantly: true,
                transform: true,
                transform_force: true,
                load_settings: true,
                update_context_menus: true,
            });

            if (n(settings)) {
                await d_actions.Actions.set({ settings });
            }

            s_theme.Theme.set({
                name: data.settings.prefs.options_page_theme,
            });
            s_css_vars.CssVars.set();
        }, 'cot_1017');

    private set = ({ settings }: { settings?: i_data.Settings } = {}): Promise<
        i_data.Settings | undefined
    > =>
        err_async(async () => {
            let settings_final: i_data.Settings | undefined;

            if (isEmpty(settings)) {
                let default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                default_settings = s_data.Settings.apply_unchanged_prefs({
                    settings: default_settings,
                });

                settings_final = default_settings;
            } else if (n(settings)) {
                settings_final = settings;
            }

            const set_inner = (): i_data.Settings | undefined => {
                runInAction(() =>
                    err(() => {
                        if (n(settings_final)) {
                            data.settings = settings_final;
                        }
                    }, 'cot_1132'),
                );

                return settings_final;
            };

            return set_inner();
        }, 'cot_1018');
}

export const Restore = Class.get_instance();
