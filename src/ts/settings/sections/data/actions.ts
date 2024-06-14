import _ from 'lodash';
import { makeObservable, action } from 'mobx';

import { d_settings, i_data } from 'shared/internal';
import { d_sections } from 'settings/internal';

export class Actions {
    private static i0: Actions;

    public static i(): Actions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            create_action: action,
            update_action: action,
            delete_action: action,
        });
    }

    public create_action = (): void =>
        err(() => {
            const action_with_highest_position: i_data.Action | undefined = _.maxBy(
                data.actions,
                'action_position',
            ) as i_data.Action | undefined;

            if (n(action_with_highest_position)) {
                data.current_action.id = x.unique_id();
                const new_action: i_data.Action = { ...data.current_action };
                data.current_action.indexed_action_name = `[${data.current_action.action_position}] ${new_action.action_name}`;

                data.actions = data.actions.map(
                    (action_2: i_data.Action): i_data.Action =>
                        err(() => {
                            if (data.current_action.action_position <= action_2.action_position) {
                                action_2.action_position += 1;
                            }

                            return action_2;
                        }, 'cot_1051'),
                );

                data.actions.push({ ...data.current_action });
                data.settings.current_action = new_action.id;
                data.actions = d_settings.Actions.i().create_indexed_action_name_and_sort_actions({
                    actions: data.actions,
                });

                d_sections.Val.i().update_settings();
            }
        }, 'cot_1049');

    public update_action = (): void =>
        err(() => {
            const { current_action_initial } = d_settings.Actions.i();

            data.actions = data.actions.map(
                (action_2: i_data.Action): i_data.Action =>
                    err(() => {
                        if (n(current_action_initial)) {
                            if (
                                action_2.action_position > current_action_initial.action_position &&
                                action_2.action_position <= data.current_action.action_position
                            ) {
                                action_2.action_position -= 1;
                            } else if (
                                action_2.action_position < current_action_initial.action_position &&
                                action_2.action_position >= data.current_action.action_position
                            ) {
                                action_2.action_position += 1;
                            }
                        }

                        return action_2;
                    }, 'cot_1056'),
            );

            data.actions = data.actions.map(
                (action_2: i_data.Action): i_data.Action =>
                    err(() => {
                        if (action_2.id === data.current_action.id) {
                            action_2 = { ...data.current_action };
                        }

                        return action_2;
                    }, 'cot_1056'),
            );

            data.settings.current_action = undefined;
            data.settings.current_action = data.current_action.id;
            d_settings.Actions.i().current_action_initial = { ...data.current_action };
            data.actions = d_settings.Actions.i().create_indexed_action_name_and_sort_actions({
                actions: data.actions,
            });

            d_sections.Val.i().update_settings();
        }, 'cot_1055');

    public delete_action = (): Promise<void> =>
        err_async(async () => {
            const { current_action_initial } = d_settings.Actions.i();

            data.actions = data.actions.filter((action_2: i_data.Action): boolean =>
                err(
                    () => n(current_action_initial) && action_2.id !== current_action_initial.id,
                    'cot_1058',
                ),
            );

            data.actions = data.actions.map(
                (action_2: i_data.Action): i_data.Action =>
                    err(() => {
                        if (
                            n(current_action_initial) &&
                            action_2.action_position > current_action_initial.action_position
                        ) {
                            action_2.action_position -= 1;
                        }

                        return action_2;
                    }, 'cot_1059'),
            );

            const previous_action_i: number = data.actions.findIndex(
                (action_2: i_data.Action): boolean =>
                    err(
                        () =>
                            n(current_action_initial) &&
                            current_action_initial.action_position - 1 === action_2.action_position,
                        'cot_1060',
                    ),
            );

            data.current_action = {
                ...(n(current_action_initial) && current_action_initial.action_position === 1
                    ? data.actions[0]
                    : data.actions[previous_action_i]),
            };
            data.settings.current_action = { ...data.current_action }.id;
            d_settings.Actions.i().current_action_initial = { ...data.current_action };
            data.actions = d_settings.Actions.i().create_indexed_action_name_and_sort_actions({
                actions: data.actions,
            });

            if (n(current_action_initial)) {
                await ext.storage_remove([current_action_initial.id]);

                d_sections.Val.i().update_settings();
            }
        }, 'cot_1057');
}
