import _ from 'lodash';

import { d_actions } from 'shared/internal';

export class Manipulation {
    private static i0: Manipulation;

    public static i(): Manipulation {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public update_settings = (): void =>
        err(() => {
            ext.send_msg({
                msg: 'update_settings',
                settings: {
                    settings: data.settings,
                    ..._.keyBy(
                        d_actions.Actions.i().remove_indexed_action_name({
                            actions: data.actions,
                        }),
                        'id',
                    ),
                },
                update_instantly: true,
            });
        }, 'cot_1061');

    public enable_developer_mode_save_callback = (): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings',
                settings: {
                    settings: {
                        ...data.settings,
                        ...{ developer_mode: data.settings.developer_mode },
                    },
                },
            });
        }, 'cot_1021');
}
