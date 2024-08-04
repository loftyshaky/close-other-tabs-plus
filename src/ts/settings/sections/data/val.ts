import { t } from '@loftyshaky/shared/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { s_settings } from '@loftyshaky/shared/settings';
import { s_css_vars } from 'shared_clean/internal';
import { d_data, d_sections, d_optional_permissions, s_sections } from 'settings/internal';

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
                    s_sections.Utils.i().is_textarea_input({ input_name: input.name }) ||
                    input.name === 'urls'
                ) {
                    const granted_tabs_permission: boolean =
                        await d_optional_permissions.Permissions.i().set({ input });

                    if (input.name === 'urls') {
                        val = granted_tabs_permission ? raw_val : 'any_url';
                    } else {
                        val = granted_tabs_permission ? raw_val : '';
                    }
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

                s_css_vars.CssVars.i().set();

                if (n(input.val_accessor) && ['actions', 'main_action'].includes(input.name)) {
                    if (input.name === 'actions') {
                        d_sections.Validation.i().input_is_valid = true;

                        d_sections.Validation.i().reset_is_in_warn_state();
                    }

                    await d_data.Manipulation.i().send_msg_to_update_settings({
                        settings: {
                            settings: data.settings,
                        },
                        update_instantly: true,
                        load_settings: input.name === 'actions',
                    });
                }

                if (!n(input.val_accessor) && input.name !== 'actions') {
                    await d_data.Manipulation.i().send_msg_to_update_settings({
                        settings: {
                            settings: {
                                ...data.settings,
                                ...{ [input.name]: val },
                            },
                        },
                        update_instantly: input.type === 'checkbox',
                    });
                }
            },
            'cot_1020',
            { silent: true },
        );
}
