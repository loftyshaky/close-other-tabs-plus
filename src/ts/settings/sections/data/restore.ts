import _ from 'lodash';

import { t, s_theme } from '@loftyshaky/shared';
import { d_data, s_css_vars, i_data } from 'shared/internal';
import { d_optional_permissions } from 'settings/internal';

export class Restore {
    private static i0: Restore;

    public static i(): Restore {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
                const settings_final: i_data.Settings | undefined = await this.set({ settings });

                ext.send_msg({
                    msg: 'update_settings',
                    settings: settings_final,
                    replace: true,
                    update_instantly: true,
                });

                s_theme.Main.i().set({
                    name: data.settings.options_page_theme,
                });
                s_css_vars.CssVars.i().set();
            }
        }, 'cot_1016');

    public restore_back_up = ({ data_objs }: { data_objs: t.AnyRecord[] }): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings = {
                ...this.get_unchanged_settings(),
                ...data_objs[0],
            } as i_data.Settings;

            await this.set({ settings });

            d_optional_permissions.Permissions.i().set_on_back_up_restore();

            ext.send_msg({
                msg: 'update_settings',
                settings,
                update_instantly: true,
                transform: true,
                replace: true,
            });

            s_theme.Main.i().set({
                name: data.settings.options_page_theme,
            });
            s_css_vars.CssVars.i().set();
        }, 'cot_1017');

    private set = ({ settings }: { settings?: i_data.Settings } = {}): Promise<
        i_data.Settings | undefined
    > =>
        err_async(async () => {
            let settings_final: i_data.Settings | undefined;

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

            if (n(settings_final)) {
                await d_data.Transform.i().set_transformed({ settings: _.clone(settings_final) });

                return settings_final;
            }

            return settings_final;
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
