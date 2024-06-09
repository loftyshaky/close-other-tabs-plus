import { makeObservable, computed } from 'mobx';

import { s_utils } from '@loftyshaky/shared';
import { o_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { d_settings } from '@loftyshaky/shared/settings';
import { d_sections } from 'settings/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            current_section: computed,
        });
    }

    public get current_section() {
        return n(data.settings.current_section) ? data.settings.current_section : 'actions';
    }

    private options: i_inputs.Options = {};
    public sections: o_inputs.Section[] | i_inputs.Sections = [];

    public init_options = (): void =>
        err(() => {
            this.options = {
                actions: [],
                main_action: [],
                action_type: [
                    new o_inputs.Option({ name: 'close' }),
                    new o_inputs.Option({ name: 'pin' }),
                    new o_inputs.Option({ name: 'unpin' }),
                ],
                windows_to_affect: [
                    new o_inputs.Option({ name: 'current_window' }),
                    new o_inputs.Option({ name: 'all_windows' }),
                    new o_inputs.Option({ name: 'other_windows' }),
                ],
                tabs_to_affect: [
                    new o_inputs.Option({ name: 'current_tab' }),
                    new o_inputs.Option({ name: 'all_tabs' }),
                    new o_inputs.Option({ name: 'other_tabs' }),
                    new o_inputs.Option({ name: 'tabs_to_right' }),
                    new o_inputs.Option({ name: 'tabs_to_left' }),
                ],
                pinned_tabs: [
                    new o_inputs.Option({ name: 'pinned_and_unpinned' }),
                    new o_inputs.Option({ name: 'pinned' }),
                    new o_inputs.Option({ name: 'unpinned' }),
                ],
                grouped_tabs: [
                    new o_inputs.Option({ name: 'grouped_and_ungrouped' }),
                    new o_inputs.Option({ name: 'grouped' }),
                    new o_inputs.Option({ name: 'ungrouped' }),
                ],
                domains: [
                    new o_inputs.Option({
                        name: 'current_domain',
                    }),
                    new o_inputs.Option({ name: 'any_domain' }),
                    new o_inputs.Option({
                        name: 'any_domain_except_current',
                    }),
                ],
            };
        }, 'cnt_1268');

    public init_sections = (): void =>
        err(() => {
            this.sections = [
                ...[
                    new o_inputs.Section({
                        name: 'actions',
                        inputs: [
                            new o_inputs.Select({
                                name: 'actions',
                                options: this.options,
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'main_action',
                                options: this.options,
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Group({
                                name: 'action_btns',
                                event_callback: () => undefined,
                                inputs: [
                                    new o_inputs.Btn({
                                        name: 'create_action',
                                        event_callback: () => {},
                                    }),
                                    new o_inputs.Btn({
                                        name: 'update_action',
                                        event_callback: () => {},
                                    }),
                                    new o_inputs.Btn({
                                        name: 'delete_action',
                                        event_callback: () => {},
                                    }),
                                ],
                            }),
                            new o_inputs.Hr({
                                name: 'hr_1',
                            }),
                            new o_inputs.Text({
                                name: 'action_name',
                                val_accessor: 'main_action.action_name',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Text({
                                name: 'action_position',
                                text_type: 'number',
                                val_accessor: 'main_action.action_position',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'action_type',
                                options: this.options,
                                val_accessor: 'main_action.action_type',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'windows_to_affect',
                                options: this.options,
                                val_accessor: 'main_action.windows_to_affect',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'tabs_to_affect',
                                options: this.options,
                                val_accessor: 'main_action.tabs_to_affect',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'pinned_tabs',
                                options: this.options,
                                val_accessor: 'main_action.pinned_tabs',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'grouped_tabs',
                                options: this.options,
                                val_accessor: 'main_action.grouped_tabs',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'domains',
                                options: this.options,
                                val_accessor: 'main_action.domains',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Textarea({
                                name: 'domain_whitelist',
                                val_accessor: 'main_action.domain_whitelist',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Textarea({
                                name: 'domain_blacklist',
                                val_accessor: 'main_action.domain_blacklist',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'open_new_tab_after_action',
                                val_accessor: 'main_action.open_new_tab_after_action',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Textarea({
                                name: 'urls_after_action',
                                val_accessor: 'main_action.urls_after_action',
                                event_callback: d_sections.Val.i().change,
                            }),
                        ],
                    }),
                    new o_inputs.Section({
                        name: 'tab_counter',
                        inputs: [
                            new o_inputs.Checkbox({
                                name: 'tab_counter_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                        ],
                    }),
                ],
                ...d_settings.Sections.i().make_shared_sections({
                    download_back_up_callback: ext.storage_get,
                    upload_back_up_callback: d_sections.Restore.i().restore_back_up,
                    restore_defaults_callback: () => d_sections.Restore.i().restore_confirm(),
                    input_change_val_callback: d_sections.Val.i().change,
                }),
                ...[
                    new o_inputs.Section({
                        name: 'links',
                        inputs: [
                            new o_inputs.Link({
                                name: 'docs',
                            }),
                            new o_inputs.Link({
                                name: 'privacy_policy',
                                href: ext.msg('privacy_policy_link_href'),
                            }),
                            new o_inputs.Link({
                                name: 'rate',
                                browser: env.browser,
                                force_resolve: true,
                            }),
                            ...(env.browser === 'edge'
                                ? []
                                : [
                                      new o_inputs.Link({
                                          name: 'advanced_extension_reloaderi1i',
                                          browser: 'chrome',
                                      }),
                                      new o_inputs.Link({
                                          name: 'advanced_extension_reloaderi2i',
                                          browser: 'edge',
                                      }),
                                  ]),
                            new o_inputs.Link({
                                name: 'github',
                            }),
                            new o_inputs.Link({
                                name: 'facebook_page',
                                href: ext.msg('facebook_page_link_href'),
                            }),
                            new o_inputs.Link({
                                name: 'support_page',
                                href: ext.msg('support_page_link_href'),
                            }),
                            ...(env.browser === 'edge'
                                ? []
                                : [
                                      new o_inputs.Link({
                                          name: 'dependencies',
                                          href: ext.msg('dependencies_link_href'),
                                      }),
                                  ]),
                        ],
                    }),
                ],
            ];

            this.sections = s_utils.Main.i().to_object({
                arr: this.sections as o_inputs.Section[],
            });
            this.sections.back_up.inputs = s_utils.Main.i().to_object({
                arr: this.sections.back_up.inputs as o_inputs.Section[],
            });
            this.sections.restore.inputs = s_utils.Main.i().to_object({
                arr: this.sections.restore.inputs as o_inputs.Section[],
            });
            this.sections.admin.inputs = s_utils.Main.i().to_object({
                arr: this.sections.admin.inputs as o_inputs.Section[],
            });
            this.sections.actions.inputs = s_utils.Main.i().to_object({
                arr: this.sections.actions.inputs as o_inputs.Section[],
                section: 'actions',
            });
            this.sections.tab_counter.inputs = s_utils.Main.i().to_object({
                arr: this.sections.tab_counter.inputs as o_inputs.Section[],
                section: 'tab_counter',
            });
            this.sections.links.inputs = s_utils.Main.i().to_object({
                arr: this.sections.links.inputs as o_inputs.Section[],
                section: 'links',
            });
        }, 'cot_1014');

    public change_section_val = (): void =>
        err(() => {
            data.settings.current_section = d_settings.Sections.i().current_section;

            ext.send_msg({
                msg: 'update_settings',
                settings: {
                    settings: {
                        ...data.settings,
                        ...{ current_section: d_settings.Sections.i().current_section },
                    },
                },
            });
        }, 'cot_1015');
}
