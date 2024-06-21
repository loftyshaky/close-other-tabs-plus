import { i_inputs } from '@loftyshaky/shared/inputs';
import { d_optional_permissions } from '@loftyshaky/shared/settings';

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

    public set = ({ input }: { input: i_inputs.Input }): Promise<boolean> =>
        err_async(async () => {
            const is_tabs_permission_input: boolean = ['url_whitelist', 'url_blacklist'].includes(
                input.name,
            );
            const contains_permission: boolean = await we.permissions.contains(
                this.optional_permission_checkbox_dict.filter_lists,
            );

            if (is_tabs_permission_input && !contains_permission) {
                return d_optional_permissions.Main.i().set_permission({
                    name: 'filter_lists',
                    optional_permission_checkbox_dict: this.optional_permission_checkbox_dict,
                    set_checkbox_val: false,
                });
            }

            return true;
        }, 'cot_1086');
}
