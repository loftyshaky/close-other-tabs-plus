import { runInAction } from 'mobx';

import { d_settings } from '@loftyshaky/shared/shared';
import { d_data, i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.SettingsWrapped = await d_settings.Settings.set_from_storage({
                run_in_action: runInAction,
            });

            await d_data.Settings.set_actions({ settings });
        }, 'cot_1035');
}

export const Settings = Class.get_instance();
