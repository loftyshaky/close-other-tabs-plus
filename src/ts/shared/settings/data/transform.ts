import _ from 'lodash';
import { runInAction } from 'mobx';

import { d_settings as d_settings_shared } from '@loftyshaky/shared';
import { d_settings } from 'shared/internal';

export class Transform {
    private static i0: Transform;

    public static i(): Transform {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_transformed = ({ settings = undefined }: { settings?: any } = {}): Promise<void> =>
        err_async(async () => {
            let settings_final: any;

            if (_.isEmpty(settings)) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                settings_final = default_settings;
            } else {
                settings_final = settings;
            }

            runInAction(() => {
                data.settings = n(settings_final.settings)
                    ? settings_final.settings
                    : settings_final;
                data.main_action = d_settings.Actions.i().extract_main_action({
                    settings: settings_final,
                });
            });

            ext.send_msg({ msg: 'react_to_change' });
        }, 'cot_1035');

    public set_transformed_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings = await ext.storage_get();
            const settings_are_corrupt: boolean = n(settings.settings)
                ? !n(settings.settings.enable_cut_features)
                : !n(settings.enable_cut_features);

            if (_.isEmpty(settings) || settings_are_corrupt) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                await ext.storage_set(default_settings);
                await d_settings_shared.Main.i().set({
                    settings: default_settings,
                    settings_are_corrupt,
                });
            }

            if (!settings_are_corrupt) {
                this.set_transformed({ settings });
            }
        }, 'cot_1036');
}
