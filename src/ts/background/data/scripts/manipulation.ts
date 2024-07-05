import _ from 'lodash';

import { s_service_worker } from '@loftyshaky/shared';
import { d_actions, i_data } from 'shared/internal';
import { s_context_menu, s_data, s_tab_counter } from 'background/internal';

export class Manipulation {
    private static i0: Manipulation;

    public static i(): Manipulation {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage_run_prevented: boolean = false;

    public update_settings = ({
        settings,
        transform = false,
        replace = false,
        load_settings = false,
        test_actions = false,
    }: {
        settings?: i_data.SettingsWrapped;
        transform?: boolean;
        replace?: boolean;
        load_settings?: boolean;
        test_actions?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const default_settings: i_data.SettingsWrapped = test_actions
                ? (s_data.Data.i().test_actions as i_data.SettingsWrapped)
                : (s_data.Data.i().defaults as i_data.SettingsWrapped);
            const settings_2: i_data.SettingsWrapped = n(settings) ? settings : default_settings;

            let settings_final: i_data.SettingsWrapped = settings_2;

            if (test_actions) {
                const current_settings: i_data.SettingsWrapped = await ext.storage_get();

                current_settings.settings.current_action_id =
                    s_data.Data.i().default_test_action_id;
                current_settings.settings.main_action_id = s_data.Data.i().default_test_action_id;

                settings_final.settings = current_settings.settings;
            } else if (transform) {
                settings_final = await this.transform({ settings: settings_2 });
            }

            await ext.storage_set(settings_final, replace);
            await d_actions.Actions.i().set();
            await s_context_menu.Items.i().create_itmes();
            s_service_worker.ServiceWorker.i().make_persistent();
            await s_tab_counter.Badge.i().set_tab_count();

            if (load_settings) {
                await ext.send_msg_resp({ msg: 'load_settings' });
            }
        }, 'cot_1001');

    public update_settings_debounce = _.debounce(
        (settings: i_data.SettingsWrapped, transform: boolean = false, replace: boolean = false) =>
            err_async(async () => {
                await this.update_settings({ settings, transform, replace });
            }, 'cot_1002'),
        500,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            if (!n(data.settings.enable_cut_features)) {
                const settings: i_data.SettingsWrapped = await ext.storage_get();

                if (_.isEmpty(settings)) {
                    await this.update_settings({ transform });
                } else if (transform) {
                    await this.update_settings({ settings, transform });
                }
            }
        }, 'cot_1003');

    private transform = ({
        settings,
    }: {
        settings: i_data.SettingsWrapped;
    }): Promise<i_data.SettingsWrapped> => err_async(async () => settings, 'cot_1004');
}
