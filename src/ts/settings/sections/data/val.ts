import _ from 'lodash';

import { t } from '@loftyshaky/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { s_settings } from '@loftyshaky/shared/settings';
import { s_css_vars, d_settings } from 'shared/internal';

export class Val {
    private static i0: Val;

    public static i(): Val {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public change = ({ input }: { input: i_inputs.Input }): Promise<void> =>
        err_async(
            async () => {
                const raw_val = d_inputs.Val.i().access({ input });
                let val: t.AnyUndefined;

                if (
                    ['domain_whitelist', 'domain_blacklist', 'urls_after_action'].includes(
                        input.name,
                    )
                ) {
                    val = _.map((raw_val as string).split(','), _.trim);
                } else if (n(raw_val)) {
                    val = input.name === 'transition_duration' ? +raw_val : raw_val;

                    s_settings.Theme.i().change({
                        input,
                        name: val as string,
                    });
                }

                d_inputs.Val.i().set({
                    val,
                    input,
                });

                s_css_vars.Main.i().set();

                if (n(input.val_accessor)) {
                    await d_settings.Actions.i().set_actions();
                } else {
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
}
