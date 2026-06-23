import keyBy from 'lodash/keyBy';

import { s_data } from '@loftyshaky/shared/shared_clean';
import type { i_data } from 'shared_clean/internal';
import { d_actions } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public is_internal_storage_write: boolean = false;
    private is_internal_storage_write_timeout: number = 0;

    public send_msg_to_update_settings = ({
        settings,
        replace = false,
        update_instantly = false,
        update_context_menus = false,
        transform = false,
        transform_force = false,
        load_settings = false,
        restore_back_up = false,
    }: {
        settings?: i_data.Settings;
        replace?: boolean;
        update_instantly?: boolean;
        update_context_menus?: boolean;
        transform?: boolean;
        transform_force?: boolean;
        load_settings?: boolean;
        restore_back_up?: boolean;
    }): Promise<void> =>
        err_async(async () => {
            clearTimeout(this.is_internal_storage_write_timeout);

            this.is_internal_storage_write = true;

            await s_data.Cache.set({
                key: 'updating_settings',
                val: true,
            });

            await ext.send_msg_resp({
                msg: 'update_settings',
                settings,
                replace,
                update_instantly,
                update_context_menus,
                transform,
                transform_force,
                load_settings,
                restore_back_up,
            });

            this.is_internal_storage_write_timeout = setTimeout(() => {
                this.is_internal_storage_write = false;
            }, 500);
        }, 'cot_1116');

    public update_settings = (): Promise<void> =>
        err_async(async () => {
            // Used when creating/updating/deleting action.
            await this.send_msg_to_update_settings({
                settings: {
                    prefs: x.to_plain(data.settings.prefs),
                    ...keyBy(
                        d_actions.Actions.remove_indexed_action_name({
                            actions: x.to_plain(data.actions),
                        }),
                        'id',
                    ),
                },
                update_instantly: true,
                update_context_menus: true,
                load_settings: true,
            });
        }, 'cot_1061');

    public enable_developer_mode_save_callback = (): Promise<void> =>
        err_async(async () => {
            const storage_settings: i_data.Settings = (await ext.storage_get()) as i_data.Settings;

            await this.send_msg_to_update_settings({
                settings: {
                    ...storage_settings,
                    prefs: {
                        ...x.to_plain(data.settings.prefs),
                        developer_mode: data.settings.prefs.developer_mode,
                    },
                },
            });
        }, 'cot_1021');
}

export const Manipulation = Class.get_instance();
