import { i_inputs } from '@loftyshaky/shared/inputs';
import { d_optional_permissions } from '@loftyshaky/shared/settings';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_permission = ({ input }: { input: i_inputs.Input }): Promise<boolean> =>
        err_async(async () => {
            const is_tabs_permission_input: boolean = ['url_whitelist', 'url_blacklist'].includes(
                input.name,
            );

            return is_tabs_permission_input
                ? d_optional_permissions.Main.i().set_permission({
                      name: 'filter_lists',
                      optional_permission_checkbox_dict: {
                          filter_lists: { permissions: ['tabs'], origins: [] },
                      },
                      set_checkbox_val: false,
                  })
                : true;
        }, 'cot_1086');
}
