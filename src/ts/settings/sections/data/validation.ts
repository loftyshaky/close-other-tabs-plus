import { runInAction } from 'mobx';

import { i_data } from '@loftyshaky/shared/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { d_sections, s_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public input_is_valid: boolean = true;

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            this.input_is_valid = false;
            let input_is_invalid: boolean = true;
            const val: i_data.Val = d_inputs.Val.access({ input }) as string;

            if (input.name === 'action_name') {
                input_is_invalid = val.trim() === '' || val.length < 1 || val.length > 80;
            } else if (input.name === 'action_position') {
                const action_position_val: i_data.Val = d_inputs.Val.access({
                    input,
                }) as number;

                input_is_invalid =
                    action_position_val < 1 || action_position_val > data.actions.length + 1;
            } else if (s_sections.Utils.is_textarea_input({ input_name: input.name })) {
                input_is_invalid = !(
                    /^[A-Za-z0-9-_.~!*'();:@&=+$,/?%#[\]]+$/.test(val) || val.trim() === ''
                );
            }

            if (!input_is_invalid) {
                this.input_is_valid = true;
            }

            return input_is_invalid;
        }, 'cot_1079');

    public reset_is_in_warn_state = (): void =>
        err(() => {
            (
                Object.values(
                    (d_sections.Sections.sections as any).actions.inputs,
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
}

export const Validation = Class.get_instance();
