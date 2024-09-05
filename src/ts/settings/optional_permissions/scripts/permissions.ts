import { i_inputs } from '@loftyshaky/shared/inputs';
import { d_optional_permissions } from '@loftyshaky/shared/settings';
import { d_data } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

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
            const contains_permission: boolean = await this.check_if_contains_tabs_permission();

            if ((is_tabs_permission_input || force) && !contains_permission) {
                const granted: boolean = await this.set_tabs_permission();

                return granted;
            }

            return true;
        }, 'cot_1086');

    public set_tabs_permission_setting = (): Promise<void> =>
        err_async(async () => {
            if (!data.settings.prefs.tabs_permission) {
                const contains_permission: boolean = await this.check_if_contains_tabs_permission();
                data.settings.prefs.tabs_permission = contains_permission;

                if (contains_permission) {
                    d_data.Manipulation.send_msg_to_update_settings({
                        settings: {
                            ...data.settings,
                            prefs: data.settings.prefs,
                        },
                        update_instantly: true,
                    });
                }
            }
        }, 'cot_1134');

    public set_on_back_up_restore = ({
        tabs_permission,
    }: {
        tabs_permission: boolean;
    }): Promise<boolean> =>
        err_async(async () => {
            if (tabs_permission) {
                return this.set({ force: true });
            }

            return this.check_if_contains_tabs_permission();
        }, 'cot_1133');

    public check_if_contains_tabs_permission = (): Promise<boolean> =>
        err_async(
            async () =>
                we.permissions.contains(this.optional_permission_checkbox_dict.filter_lists),
            'cot_1131',
        );

    private set_tabs_permission = (): Promise<boolean> =>
        err_async(
            async () =>
                d_optional_permissions.Permission.set({
                    name: 'filter_lists',
                    optional_permission_checkbox_dict: this.optional_permission_checkbox_dict,
                    set_checkbox_val: false,
                }),
            'cot_1132',
        );
}

export const Permissions = Class.get_instance();
