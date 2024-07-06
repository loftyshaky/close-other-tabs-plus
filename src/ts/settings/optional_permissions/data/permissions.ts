import { i_inputs } from '@loftyshaky/shared/inputs';
import { d_optional_permissions } from '@loftyshaky/shared/settings';
import { i_actions } from 'shared/internal';

export class Permissions {
    private static i0: Permissions;

    public static i(): Permissions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private optional_permission_checkbox_dict = {
        filter_lists: { permissions: ['tabs'], origins: [] },
    };

    public set = ({
        input,
        force = false,
    }: {
        input?: i_inputs.Input;
        force?: boolean;
    }): Promise<boolean> =>
        err_async(async () => {
            const is_tabs_permission_input: boolean = [
                'url_whitelist',
                'url_blacklist',
                'urls',
            ].includes(n(input) ? input.name : '');
            const contains_permission: boolean = await we.permissions.contains(
                this.optional_permission_checkbox_dict.filter_lists,
            );

            if ((is_tabs_permission_input || force) && !contains_permission) {
                return d_optional_permissions.Main.i().set_permission({
                    name: 'filter_lists',
                    optional_permission_checkbox_dict: this.optional_permission_checkbox_dict,
                    set_checkbox_val: false,
                });
            }

            return true;
        }, 'cot_1086');

    public set_on_back_up_restore = (): void =>
        err(() => {
            data.actions.some((action: i_actions.Action): boolean =>
                err(
                    () =>
                        Object.entries(action).some(([key, val]: any): boolean =>
                            err(() => {
                                if (
                                    (['url_whitelist', 'url_blacklist'].includes(key) &&
                                        val.length > 0) ||
                                    (key === 'urls' && val !== 'any_url')
                                ) {
                                    this.set({ force: true });

                                    return true;
                                }

                                return false;
                            }, 'cot_1097'),
                        ),
                    'cot_1096',
                ),
            );
        }, 'cot_1095');
}
