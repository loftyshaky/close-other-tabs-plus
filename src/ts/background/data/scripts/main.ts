import _ from 'lodash';

import { t, s_service_worker } from '@loftyshaky/shared';
import { i_data } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public defaults: i_data.Settings | t.EmptyRecord = {};
    public set_from_storage_run_prevented: boolean = false;

    public init_defaults = (): void =>
        err(() => {
            this.defaults = {
                current_section: 'actions',
                options_page_theme: 'lavender',
                transition_duration: 200,
                show_color_help: true,
                developer_mode: false,
                enable_cut_features: false,
                persistent_service_worker: false,
                offers_are_visible: true,
                tab_count_is_visible: true,
            };
        }, 'cot_1000');

    public update_settings = ({
        settings,
        transform = false,
    }: {
        settings?: i_data.Settings;
        transform?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const settings_2: i_data.Settings = n(settings)
                ? settings
                : (this.defaults as i_data.Settings);

            let settings_final: i_data.Settings = settings_2;

            if (transform) {
                settings_final = await this.transform({ settings: settings_2 });
            }

            await ext.storage_set(settings_final);

            s_service_worker.ServiceWorker.i().make_persistent();
        }, 'cot_1001');

    public update_settings_debounce = _.debounce(
        (settings: i_data.Settings, rerun_actions: boolean = false, transform: boolean = false) =>
            err_async(async () => {
                await this.update_settings({ settings, transform });

                if (rerun_actions) {
                    ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
                }
            }, 'cot_1002'),
        500,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings = await ext.storage_get();

            if (_.isEmpty(settings)) {
                await this.update_settings({ transform });
            } else if (transform) {
                await this.update_settings({ settings, transform });
            }
        }, 'cot_1003');

    private transform = ({ settings }: { settings: i_data.Settings }): Promise<i_data.Settings> =>
        err_async(async () => settings, 'cot_1004');
}
