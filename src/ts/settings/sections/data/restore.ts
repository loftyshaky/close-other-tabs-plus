import _ from 'lodash';
import { runInAction } from 'mobx';

import { t, s_theme } from '@loftyshaky/shared';
import { s_css_vars, d_data as d_data_shared, i_data } from 'shared/internal';
import { d_data, d_optional_permissions } from 'settings/internal';

export class Restore {
    private static i0: Restore;

    public static i(): Restore {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public restore_defaults = ({
        settings,
    }: { settings?: i_data.SettingsWrapped } = {}): Promise<void> =>
        err_async(async () => {
            // eslint-disable-next-line no-alert
            const confirmed_restore: boolean = globalThis.confirm(
                ext.msg('restore_defaults_confirm'),
            );

            if (confirmed_restore) {
                const settings_final: i_data.SettingsWrapped | undefined = await this.set({
                    settings,
                });

                await d_data.Manipulation.i().send_msg_to_update_settings({
                    settings: settings_final,
                    replace: true,
                    update_instantly: true,
                });
                await d_data_shared.Settings.i().set_actions({ settings: settings_final });

                s_theme.Main.i().set({
                    name: data.settings.options_page_theme,
                });
                s_css_vars.CssVars.i().set();
            }
        }, 'cot_1016');

    public restore_back_up = ({ data_objs }: { data_objs: t.AnyRecord[] }): Promise<void> =>
        err_async(async () => {
            data_objs[0].settings = { ...data_objs[0].settings, ...this.get_unchanged_settings() };
            let settings: i_data.SettingsWrapped | undefined =
                data_objs[0] as i_data.SettingsWrapped;

            settings = await this.set({ settings });

            d_optional_permissions.Permissions.i().set_on_back_up_restore();

            await d_data.Manipulation.i().send_msg_to_update_settings({
                settings,
                update_instantly: true,
                transform: true,
                replace: true,
            });
            await d_data_shared.Settings.i().set_actions({ settings });

            s_theme.Main.i().set({
                name: data.settings.options_page_theme,
            });
            s_css_vars.CssVars.i().set();
        }, 'cot_1017');

    private set = ({ settings }: { settings?: i_data.SettingsWrapped } = {}): Promise<
        i_data.SettingsWrapped | undefined
    > =>
        err_async(async () => {
            let settings_final: i_data.SettingsWrapped | undefined;

            if (_.isEmpty(settings)) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                settings_final = {
                    ...default_settings,
                    settings: {
                        ...default_settings.settings,
                        ...this.get_unchanged_settings().settings,
                    },
                };
            } else if (n(settings)) {
                settings_final = settings;
            }

            const set_inner = (): i_data.SettingsWrapped | undefined => {
                runInAction(() =>
                    err(() => {
                        if (n(settings_final)) {
                            data.settings = settings_final.settings;
                        }
                    }, 'seg_1132'),
                );

                return settings_final;
            };

            return set_inner();
        }, 'cot_1018');

    private get_unchanged_settings = (): t.AnyRecord =>
        err(
            () => ({
                settings: {
                    current_section: data.settings.current_section,
                    show_color_help: data.settings.show_color_help,
                },
            }),
            'cot_1019',
        );
}
