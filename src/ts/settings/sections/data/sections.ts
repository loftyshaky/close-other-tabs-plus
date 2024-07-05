import { makeObservable, computed } from 'mobx';

import { s_utils } from '@loftyshaky/shared';
import { o_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { d_settings as d_settings_loftyshaky } from '@loftyshaky/shared/settings';
import { d_actions, d_data, d_sections } from 'settings/internal';

export class Sections {
    private static i0: Sections;

    public static i(): Sections {
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

    public sections: o_inputs.Section[] | i_inputs.Sections = [];

    public init = (): void =>
        err(() => {
            this.sections = [
                ...[
                    new o_inputs.Section({
                        name: 'actions',
                        include_help: true,
                        alt_help_msg: 'actions_section_help_text',
                        inputs: [
                            new o_inputs.Select({
                                name: 'actions',
                                include_help: true,
                                options: d_sections.Options.i().options,
                                val_accessor: 'settings.current_action_id',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'main_action',
                                include_help: true,
                                options: d_sections.Options.i().options,
                                val_accessor: 'settings.main_action_id',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Group({
                                name: 'action_btns',
                                include_help: true,
                                event_callback: () => undefined,
                                inputs: [
                                    new o_inputs.Btn({
                                        name: 'create_action',
                                        event_callback: d_actions.Action.i().create,
                                    }),
                                    new o_inputs.Btn({
                                        name: 'update_action',
                                        event_callback: d_actions.Action.i().update,
                                    }),
                                    new o_inputs.Btn({
                                        name: 'delete_action',
                                        event_callback: d_actions.Action.i().delete,
                                    }),
                                ],
                            }),
                            new o_inputs.Hr({
                                name: 'hr_1',
                            }),
                            new o_inputs.Text({
                                name: 'action_name',
                                include_help: true,
                                val_accessor: 'current_action.name',
                                event_callback: d_sections.Val.i().change,
                                warn_state_checker: d_sections.Validation.i().validate_input,
                            }),
                            new o_inputs.Text({
                                name: 'action_position',
                                include_help: true,
                                text_type: 'number',
                                val_accessor: 'current_action.position',
                                event_callback: d_sections.Val.i().change,
                                warn_state_checker: d_sections.Validation.i().validate_input,
                            }),
                            new o_inputs.Select({
                                name: 'action_type',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.type',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'windows_to_affect',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.windows_to_affect',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'tabs_to_affect',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.tabs_to_affect',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'pinned_tabs',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.pinned_tabs',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'grouped_tabs',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.grouped_tabs',
                                is_enabled_conds: [
                                    {
                                        input_name: 'action_type',
                                        val_accessor: 'current_action.type',
                                        pass_vals: ['close', 'pin'],
                                    },
                                ],
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Select({
                                name: 'hostnames',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.hostnames',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'window_hostname_comparison',
                                include_help: true,
                                val_accessor: 'current_action.window_hostname_comparison',
                                parent: 'hostnames',
                                is_enabled_conds: [
                                    {
                                        input_name: 'hostnames',
                                        val_accessor: 'current_action.hostnames',
                                        pass_vals: [
                                            'current_hostname',
                                            'any_hostname_except_current',
                                        ],
                                    },
                                ],
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Textarea({
                                name: 'url_whitelist',
                                include_help: true,
                                val_accessor: 'current_action.url_whitelist',
                                event_callback: d_sections.Val.i().change,
                                warn_state_checker: d_sections.Validation.i().validate_input,
                            }),
                            new o_inputs.Textarea({
                                name: 'url_blacklist',
                                include_help: true,
                                val_accessor: 'current_action.url_blacklist',
                                event_callback: d_sections.Val.i().change,
                                warn_state_checker: d_sections.Validation.i().validate_input,
                            }),
                            new o_inputs.Checkbox({
                                name: 'open_new_tab_after_action',
                                val_accessor: 'current_action.open_new_tab_after_action',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Textarea({
                                name: 'urls_after_action',
                                val_accessor: 'current_action.urls_after_action',
                                event_callback: d_sections.Val.i().change,
                                warn_state_checker: d_sections.Validation.i().validate_input,
                            }),
                            new o_inputs.Select({
                                name: 'in_which_windows_to_open_tabs',
                                options: d_sections.Options.i().options,
                                val_accessor: 'current_action.in_which_windows_to_open_tabs',
                                event_callback: d_sections.Val.i().change,
                            }),
                        ],
                    }),
                    new o_inputs.Section({
                        name: 'tab_counter',
                        inputs: [
                            new o_inputs.Checkbox({
                                name: 'tab_counter_is_visible',
                                include_help: true,
                                event_callback: d_sections.Val.i().change,
                            }),
                        ],
                    }),
                    new o_inputs.Section({
                        name: 'context_menus',
                        inputs: [
                            new o_inputs.Checkbox({
                                name: 'enable_action_context_menu',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'enable_on_page_context_menu',
                                event_callback: d_sections.Val.i().change,
                            }),
                        ],
                    }),
                ],
                ...d_settings_loftyshaky.Sections.i().make_shared_sections({
                    download_back_up_callback: ext.storage_get,
                    upload_back_up_callback: d_sections.Restore.i().restore_back_up,
                    restore_defaults_callback: () => d_sections.Restore.i().restore_defaults(),
                    input_change_val_callback: d_sections.Val.i().change,
                    admin_inputs: [
                        new o_inputs.Btn({
                            name: 'create_test_actions',
                            event_callback: d_actions.Actions.i().create_test_actions,
                        }),
                    ],
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

    public change_current_section_val = (): Promise<void> =>
        err_async(async () => {
            data.settings.current_section = d_settings_loftyshaky.Sections.i().current_section;

            await d_data.Manipulation.i().send_msg_to_update_settings({
                settings: {
                    settings: {
                        ...data.settings,
                        ...{ current_section: d_settings_loftyshaky.Sections.i().current_section },
                    },
                },
            });
        }, 'cot_1015');
}
