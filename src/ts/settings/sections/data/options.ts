import isEmpty from 'lodash/isEmpty';
import { reaction } from 'mobx';

import type { i_inputs } from '@loftyshaky/shared/inputs';
import { o_inputs } from '@loftyshaky/shared/inputs';
import type { t } from '@loftyshaky/shared/shared_clean';
import { d_sections } from 'settings/internal';
import type { i_actions } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public options: i_inputs.Options = {};

    public init = (): void =>
        err(() => {
            this.options = {
                actions: [],
                main_action: [],
                action_type: [
                    new o_inputs.Option({ name: 'close' }),
                    new o_inputs.Option({ name: 'pin' }),
                    new o_inputs.Option({ name: 'unpin' }),
                    ...(env.browser === 'yandex'
                        ? []
                        : [
                              new o_inputs.Option({ name: 'group' }),
                              new o_inputs.Option({ name: 'ungroup' }),
                          ]),
                ],
                windows_to_affect: [
                    new o_inputs.Option({ name: 'current_window' }),
                    new o_inputs.Option({ name: 'all_windows' }),
                    new o_inputs.Option({ name: 'other_windows' }),
                ],
                workspaces_to_affect: [
                    new o_inputs.Option({ name: 'current_workspace' }),
                    new o_inputs.Option({ name: 'all_workspaces' }),
                    new o_inputs.Option({ name: 'other_workspaces' }),
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
                    new o_inputs.Option({ name: 'current_group' }),
                    new o_inputs.Option({ name: 'any_group_except_current' }),
                ],
                urls: [
                    new o_inputs.Option({ name: 'any_url' }),
                    new o_inputs.Option({
                        name: 'current_url',
                    }),
                    new o_inputs.Option({
                        name: 'any_url_except_current',
                    }),
                    new o_inputs.Option({
                        name: 'current_root_domain',
                    }),
                    new o_inputs.Option({
                        name: 'any_root_domain_except_current',
                    }),
                    new o_inputs.Option({
                        name: 'current_subdomain',
                    }),
                    new o_inputs.Option({
                        name: 'any_subdomain_except_current',
                    }),
                    new o_inputs.Option({
                        name: 'current_port',
                    }),
                    new o_inputs.Option({
                        name: 'any_port_except_current',
                    }),
                ],
                in_which_windows_to_open_tabs: [
                    new o_inputs.Option({ name: 'current_window' }),
                    new o_inputs.Option({ name: 'all_windows' }),
                    new o_inputs.Option({ name: 'other_windows' }),
                ],
            };
        }, 'cot_1130');

    public update_action_options = (): void => {
        reaction(
            () => data.actions,
            () => {
                if (!isEmpty(data.actions)) {
                    const action_options = data.actions.map(
                        (action_2: i_actions.Action): o_inputs.Option =>
                            err(
                                () =>
                                    new o_inputs.Option({
                                        name: action_2.id,
                                        alt_msg: action_2.indexed_action_name,
                                    }),
                                'cot_1043',
                            ),
                    );

                    this.options = {
                        ...this.options,
                        actions: action_options,
                        main_action: action_options,
                    };

                    (d_sections.Sections.sections as t.AnyRecord).actions.inputs.actions.options =
                        this.options;
                    (
                        d_sections.Sections.sections as t.AnyRecord
                    ).actions.inputs.main_action.options = this.options;
                }
            },
            { fireImmediately: true },
        );
    };
}

export const Options = Class.get_instance();
