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

    public sections: o_inputs.Section[] | i_inputs.Sections = [];

    public init_sections = (): void =>
        err(() => {
            this.sections = [
                ...[
                    new o_inputs.Section({
                        name: 'actions',
                        inputs: [
                            new o_inputs.Checkbox({
                                name: 'tab_counter_is_visible',
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
                settings: { current_section: d_settings.Sections.i().current_section },
            });
        }, 'cot_1015');
}
