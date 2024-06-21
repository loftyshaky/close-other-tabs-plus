import _ from 'lodash';

import { t, s_service_worker } from '@loftyshaky/shared';
import { d_actions, i_data } from 'shared/internal';
import { s_context_menu, s_tab_counter } from 'background/internal';

export class Manipulation {
    private static i0: Manipulation;

    public static i(): Manipulation {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public defaults: i_data.SettingsWrapped | t.EmptyRecord = {};
    public set_from_storage_run_prevented: boolean = false;

    public init_defaults = (): void =>
        err(() => {
            this.defaults = {
                settings: {
                    current_section: 'actions',
                    options_page_theme: 'aqua',
                    transition_duration: 200,
                    show_color_help: true,
                    developer_mode: false,
                    enable_cut_features: false,
                    persistent_service_worker: false,
                    offers_are_visible: true,
                    current_action_id: 'close_other_tabs',
                    main_action_id: 'close_other_tabs',
                    tab_counter_is_visible: true,
                },
                close_other_tabs: {
                    id: 'close_other_tabs',
                    name: 'Close other tabs',
                    position: 1,
                    type: 'close',
                    windows_to_affect: 'current_window',
                    tabs_to_affect: 'other_tabs',
                    pinned_tabs: 'unpinned',
                    grouped_tabs: 'grouped_and_ungrouped',
                    hostnames: 'any_hostname',
                    window_hostname_comparison: false,
                    url_whitelist: [],
                    url_blacklist: [],
                    open_new_tab_after_action: false,
                    urls_after_action: [],
                },
                close_tabs_to_the_right: {
                    id: 'close_tabs_to_the_right',
                    name: 'Close tabs to the right',
                    position: 2,
                    type: 'close',
                    windows_to_affect: 'current_window',
                    tabs_to_affect: 'tabs_to_right',
                    pinned_tabs: 'unpinned',
                    grouped_tabs: 'grouped_and_ungrouped',
                    hostnames: 'any_hostname',
                    window_hostname_comparison: false,
                    url_whitelist: [],
                    url_blacklist: [],
                    open_new_tab_after_action: false,
                    urls_after_action: [],
                },
                close_tabs_to_the_left: {
                    id: 'close_tabs_to_the_left',
                    name: 'Close tabs to the left',
                    position: 3,
                    type: 'close',
                    windows_to_affect: 'current_window',
                    tabs_to_affect: 'tabs_to_left',
                    pinned_tabs: 'unpinned',
                    grouped_tabs: 'grouped_and_ungrouped',
                    hostnames: 'any_hostname',
                    window_hostname_comparison: false,
                    url_whitelist: [],
                    url_blacklist: [],
                    open_new_tab_after_action: false,
                    urls_after_action: [],
                },
            };
        }, 'cot_1000');

    public update_settings = ({
        settings,
        transform = false,
        replace = false,
        load_settings = false,
    }: {
        settings?: i_data.SettingsWrapped;
        transform?: boolean;
        replace?: boolean;
        load_settings?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const settings_2: i_data.SettingsWrapped = n(settings)
                ? settings
                : (this.defaults as i_data.SettingsWrapped);

            let settings_final: i_data.SettingsWrapped = settings_2;

            if (transform) {
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
        (
            settings: i_data.SettingsWrapped,
            rerun_actions: boolean = false,
            transform: boolean = false,
            replace: boolean = false,
        ) =>
            err_async(async () => {
                await this.update_settings({ settings, transform, replace });

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