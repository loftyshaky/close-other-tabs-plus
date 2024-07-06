import _ from 'lodash';
import { reaction } from 'mobx';

import { o_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { i_actions } from 'shared/internal';
import { d_sections } from 'settings/internal';

export class Options {
    private static i0: Options;

    public static i(): Options {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
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
                    new o_inputs.Option({ name: 'group' }),
                    new o_inputs.Option({ name: 'ungroup' }),
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
                        name: 'current_domain',
                    }),
                    new o_inputs.Option({
                        name: 'any_domain_except_current',
                    }),
                    new o_inputs.Option({
                        name: 'current_hostname',
                    }),
                    new o_inputs.Option({
                        name: 'any_hostname_except_current',
                    }),
                ],
                in_which_windows_to_open_tabs: [
                    new o_inputs.Option({ name: 'current_window' }),
                    new o_inputs.Option({ name: 'all_windows' }),
                    new o_inputs.Option({ name: 'other_windows' }),
                ],
            };
        }, 'cnt_1268');

    public update_action_options = (): void => {
        reaction(
            () => data.actions,
            () => {
                if (!_.isEmpty(data.actions)) {
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

                    (d_sections.Sections.i().sections as any).actions.inputs.actions.options =
                        this.options;
                    (d_sections.Sections.i().sections as any).actions.inputs.main_action.options =
                        this.options;
                }
            },
            { fireImmediately: true },
        );
    };
}
