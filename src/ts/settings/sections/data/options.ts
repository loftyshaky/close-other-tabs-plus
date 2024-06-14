import _ from 'lodash';
import { autorun } from 'mobx';

import { o_inputs } from '@loftyshaky/shared/inputs';
import { i_data } from 'shared/internal';
import { d_sections } from 'settings/internal';

export class Options {
    private static i0: Options;

    public static i(): Options {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public update_action_options = (): void => {
        autorun(() => {
            if (!_.isEmpty(data.actions)) {
                const action_options = data.actions.map(
                    (action_2: i_data.Action): o_inputs.Option =>
                        err(
                            () =>
                                new o_inputs.Option({
                                    name: action_2.id,
                                    alt_msg: action_2.indexed_action_name,
                                }),
                            'cot_1043',
                        ),
                );

                d_sections.Main.i().options = {
                    ...d_sections.Main.i().options,
                    actions: action_options,
                    main_action: action_options,
                };

                (d_sections.Main.i().sections as any).actions.inputs.actions.options =
                    d_sections.Main.i().options;
                (d_sections.Main.i().sections as any).actions.inputs.main_action.options =
                    d_sections.Main.i().options;
            }
        });
    };
}
