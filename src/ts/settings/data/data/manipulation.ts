import keyBy from 'lodash/keyBy';

import { s_data } from '@loftyshaky/shared/shared_clean';
import { d_actions, i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public send_msg_to_update_settings = ({
        settings,
        replace = false,
        update_instantly = false,
        update_context_menus = false,
        transform = false,
        transform_force = false,
        load_settings = false,
    }: {
        settings?: i_data.Settings;
        replace?: boolean;
        update_instantly?: boolean;
        update_context_menus?: boolean;
        transform?: boolean;
        transform_force?: boolean;
        load_settings?: boolean;
    }): Promise<void> =>
        err_async(async () => {
            await s_data.Cache.set({
                key: 'updating_settings',
                val: true,
            });

            ext.send_msg({
                msg: 'update_settings',
                settings,
                replace,
                update_instantly,
                update_context_menus,
                transform,
                transform_force,
                load_settings,
            });
        }, 'cot_1116');

    public update_settings = (): Promise<void> =>
        err_async(async () => {
            // Used when creating/updating/deleting action.
            await this.send_msg_to_update_settings({
                settings: {
                    prefs: data.settings.prefs,
                    ...keyBy(
                        d_actions.Actions.remove_indexed_action_name({
                            actions: data.actions,
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
            await this.send_msg_to_update_settings({
                settings: {
                    ...data.settings,
                    prefs: {
                        ...data.settings.prefs,
                        ...{ developer_mode: data.settings.prefs.developer_mode },
                    },
                },
            });
        }, 'cot_1021');
}

export const Manipulation = Class.get_instance();
