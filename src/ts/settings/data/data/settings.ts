import { runInAction } from 'mobx';

import { d_settings } from '@loftyshaky/shared/shared';
import { d_data, i_data } from 'shared_clean/internal';

export class Settings {
    private static i0: Settings;

    public static i(): Settings {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.SettingsWrapped = await d_settings.Main.i().set_from_storage({
                run_in_action: runInAction,
            });

            await d_data.Settings.i().set_actions({ settings });
        }, 'cot_1035');
}
