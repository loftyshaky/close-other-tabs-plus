import { runInAction } from 'mobx';

import type { i_inputs } from '@loftyshaky/shared/inputs';
import type { i_optional_permissions as loftyshaky_i_optional_permissions } from '@loftyshaky/shared/settings';
import { d_optional_permissions } from '@loftyshaky/shared/settings';
import type { i_optional_permissions } from 'settings/internal';
import { d_data } from 'settings/internal';
import type { i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public contains_permission: i_optional_permissions.ContainsPermission = {
        filter_lists: false,
    };

    public optional_permission_checkbox_dict: loftyshaky_i_optional_permissions.OptionalPermissionCheckboxDict =
        {
            filter_lists: { permissions: ['tabs'], origins: [] },
        };

    public set_contains_permission_vals = (): Promise<void> =>
        err_async(async () => {
            await Promise.all(
                Object.keys(this.contains_permission).map(
                    async (permission_name: string): Promise<void> =>
                        err_async(async () => {
                            this.contains_permission[permission_name] =
                                await we.permissions.contains(
                                    this.optional_permission_checkbox_dict[permission_name],
                                );
                        }, 'cot_1152'),
                ),
            );
        }, 'cot_1151');

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
            const contains_permission: boolean = this.contains_permission.filter_lists;

            if ((is_tabs_permission_input || force) && !contains_permission) {
                const granted: boolean = await this.set_tabs_permission();

                return granted;
            }

            return true;
        }, 'cot_1086');

    public set_tabs_permission_setting = (): Promise<void> =>
        err_async(async () => {
            if (!data.settings.prefs.tabs_permission) {
                const contains_permission: boolean = this.contains_permission.filter_lists;

                runInAction(() =>
                    err(() => {
                        data.settings.prefs.tabs_permission = contains_permission;
                    }, 'cot_1143'),
                );

                if (contains_permission) {
                    const storage_settings: i_data.Settings =
                        (await ext.storage_get()) as i_data.Settings;

                    await d_data.Manipulation.send_msg_to_update_settings({
                        settings: {
                            ...storage_settings,
                            prefs: x.to_plain(data.settings.prefs),
                        },
                        update_instantly: true,
                    });
                }
            }
        }, 'cot_1134');

    private set_tabs_permission = (): Promise<boolean> =>
        err_async(async () => {
            const name: string = 'filter_lists';
            const granted: boolean = await d_optional_permissions.Permission.set({
                name: name,
                contains_permission: this.contains_permission[name],
                optional_permission_checkbox_dict: this.optional_permission_checkbox_dict,
                set_checkbox_val: false,
            });

            await this.set_contains_permission_vals();

            return granted;
        }, 'cot_1132');

    public set_permission = ({ name }: { name: string }): Promise<boolean> =>
        err_async(async () => {
            const granted: boolean = await d_optional_permissions.Permission.set({
                name,
                contains_permission: this.contains_permission[name],
                optional_permission_checkbox_dict: this.optional_permission_checkbox_dict,
                set_checkbox_val: false,
            });

            await this.set_contains_permission_vals();

            return granted;
        }, 'cnt_1532');

    public change_tabs_permission = (): Promise<void> =>
        err_async(async () => {
            const permission_granted: boolean = await this.set_tabs_permission();
            const storage_settings: i_data.Settings = (await ext.storage_get()) as i_data.Settings;

            runInAction(() =>
                err(() => {
                    data.settings.prefs.tabs_permission = permission_granted;
                }, 'cot_1142'),
            );

            void d_data.Manipulation.send_msg_to_update_settings({
                settings: {
                    ...storage_settings,
                    prefs: x.to_plain(data.settings.prefs),
                },
                update_instantly: true,
            });
        }, 'cot_1141');
}

export const Permissions = Class.get_instance();
