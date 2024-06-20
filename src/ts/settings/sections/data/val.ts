import _ from 'lodash';
import { runInAction } from 'mobx';

import { t, i_data } from '@loftyshaky/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { s_settings } from '@loftyshaky/shared/settings';
import { s_css_vars, d_settings } from 'shared/internal';
import { d_optional_permissions, d_sections } from 'settings/internal';

export class Val {
    private static i0: Val;

    public static i(): Val {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public input_is_valid: boolean = true;

    public change = ({ input }: { input: i_inputs.Input }): Promise<void> =>
        err_async(
            async () => {
                const raw_val = d_inputs.Val.i().access({ input });

                let val: t.AnyUndefined;

                if (this.is_textarea_input({ input_name: input.name })) {
                    const granted_tabs_permission: boolean =
                        await d_optional_permissions.Main.i().set_permission({ input });

                    val = granted_tabs_permission ? raw_val : '';
                } else if (n(raw_val)) {
                    val = input.name === 'transition_duration' ? +raw_val : raw_val;

                    s_settings.Theme.i().change({
                        input,
                        name: val as string,
                    });
                }

                const val_final =
                    n(val) && val !== '' && input.name === 'action_position' ? +val : val;

                d_inputs.Val.i().set({
                    val: val_final,
                    input,
                });

                s_css_vars.Main.i().set();

                if (n(input.val_accessor) && ['actions', 'main_action'].includes(input.name)) {
                    if (input.name === 'actions') {
                        this.input_is_valid = true;

                        this.reset_is_in_warn_state();
                    }

                    ext.send_msg({
                        msg: 'update_settings',
                        settings: {
                            settings: data.settings,
                        },
                        update_instantly: true,
                        load_settings: input.name === 'actions',
                    });
                }

                if (!n(input.val_accessor) && input.name !== 'actions') {
                    ext.send_msg({
                        msg: 'update_settings',
                        settings: {
                            settings: {
                                ...data.settings,
                                ...{ [input.name]: val },
                            },
                        },
                    });
                }
            },
            'cot_1020',
            { silent: true },
        );

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            this.input_is_valid = false;
            let input_is_invalid: boolean = true;
            const val: i_data.Val = d_inputs.Val.i().access({ input }) as string;

            if (input.name === 'action_name') {
                input_is_invalid = val.trim() === '' || val.length < 1 || val.length > 80;
            } else if (input.name === 'action_position') {
                const action_position_val: i_data.Val = d_inputs.Val.i().access({
                    input,
                }) as number;

                input_is_invalid =
                    action_position_val < 1 || action_position_val > data.actions.length + 1;
            } else if (this.is_textarea_input({ input_name: input.name })) {
                input_is_invalid = !(
                    /^[A-Za-z0-9-_.~!*'();:@&=+$,/?%#[\]]+$/.test(val) || val.trim() === ''
                );
            }

            if (!input_is_invalid) {
                this.input_is_valid = true;
            }

            return input_is_invalid;
        }, 'cot_1079');

    private reset_is_in_warn_state = (): void =>
        err(() => {
            (
                Object.values(
                    (d_sections.Main.i().sections as any).actions.inputs,
                ) as i_inputs.Input[]
            ).forEach((input: i_inputs.Input): void => {
                err(() => {
                    runInAction(() => {
                        err(() => {
                            input.is_in_warn_state = false;
                        }, 'cot_1083');
                    });
                }, 'cot_1082');
            });
        }, 'cot_1081');

    public update_settings = (): void =>
        err(() => {
            ext.send_msg({
                msg: 'update_settings',
                settings: {
                    settings: data.settings,
                    ..._.keyBy(
                        d_settings.Actions.i().remove_indexed_action_name({
                            actions: data.actions,
                        }),
                        'id',
                    ),
                },
            });
        }, 'cot_1061');

    public enable_developer_mode_save_callback = (): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings',
                settings: {
                    settings: {
                        ...data.settings,
                        ...{ developer_mode: data.settings.developer_mode },
                    },
                },
                rerun_actions: true,
            });
        }, 'cot_1021');

    public is_textarea_input = ({ input_name }: { input_name: string }): boolean =>
        err(
            () => ['url_whitelist', 'url_blacklist', 'urls_after_action'].includes(input_name),
            'cot_1084',
        );
}
