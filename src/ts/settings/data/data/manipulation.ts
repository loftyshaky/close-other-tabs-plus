import keyBy from 'lodash/keyBy';

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
        update_instantly = false,
        transform = false,
        replace = false,
        load_settings = false,
    }: {
        settings?: i_data.SettingsWrapped;
        update_instantly?: boolean;
        transform?: boolean;
        replace?: boolean;
        load_settings?: boolean;
    }): Promise<void> =>
        err_async(async () => {
            await we.storage.session.set({ updating_settings: true });

            ext.send_msg({
                msg: 'update_settings',
                settings,
                update_instantly,
                transform,
                replace,
                load_settings,
            });
        }, 'cot_1116');

    public update_settings = (): Promise<void> =>
        err_async(async () => {
            await this.send_msg_to_update_settings({
                settings: {
                    settings: data.settings,
                    ...keyBy(
                        d_actions.Actions.remove_indexed_action_name({
                            actions: data.actions,
                        }),
                        'id',
                    ),
                },
                update_instantly: true,
                replace: true,
            });
        }, 'cot_1061');

    public enable_developer_mode_save_callback = (): Promise<void> =>
        err_async(async () => {
            await this.send_msg_to_update_settings({
                settings: {
                    settings: {
                        ...data.settings,
                        ...{ developer_mode: data.settings.developer_mode },
                    },
                },
            });
        }, 'cot_1021');
}

export const Manipulation = Class.get_instance();
