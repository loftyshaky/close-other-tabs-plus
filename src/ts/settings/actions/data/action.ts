import _ from 'lodash';
import { makeObservable, action } from 'mobx';

import { d_actions as d_actions_shared, i_actions } from 'shared/internal';
import { d_actions, d_data, d_sections } from 'settings/internal';

export class Action {
    private static i0: Action;

    public static i(): Action {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<this, 'update_main_action'>(this, {
            create: action,
            update: action,
            delete: action,
            update_main_action: action,
        });
    }

    public create = (): void =>
        err(() => {
            if (d_sections.Validation.i().input_is_valid) {
                d_actions.Textarea.i().transfrom_textarea_input_into_arrays();

                const action_with_highest_position: i_actions.Action | undefined = _.maxBy(
                    data.actions,
                    'position',
                ) as i_actions.Action | undefined;

                if (n(action_with_highest_position)) {
                    data.current_action.id = x.unique_id();
                    const new_action: i_actions.Action = { ...data.current_action };
                    data.current_action.indexed_action_name = `[${data.current_action.position}] ${new_action.name}`;

                    data.actions = data.actions.map(
                        (action_2: i_actions.Action): i_actions.Action =>
                            err(() => {
                                if (data.current_action.position <= action_2.position) {
                                    action_2.position += 1;
                                }

                                return action_2;
                            }, 'cot_1051'),
                    );

                    data.actions.push({ ...data.current_action });
                    data.settings.current_action_id = new_action.id;
                    data.actions =
                        d_actions_shared.Actions.i().create_indexed_action_name_and_sort_actions({
                            actions: data.actions,
                        });
                    d_actions_shared.Actions.i().initial_current_action = {
                        ...data.current_action,
                    };
                    d_data.Manipulation.i().update_settings();

                    show_notification({
                        error_msg_key: 'action_created_notification',
                        notification_type: 'positive',
                        hide_delay: 800,
                    });
                }
            } else {
                show_notification({
                    error_msg_key: 'unable_to_create_action_notification',
                    notification_type: 'negative',
                    hide_delay: 2000,
                });
            }
        }, 'cot_1049');

    public update = (): void =>
        err(() => {
            if (d_sections.Validation.i().input_is_valid) {
                d_actions.Textarea.i().transfrom_textarea_input_into_arrays();

                const { initial_current_action } = d_actions_shared.Actions.i();
                data.current_action.position =
                    data.current_action.position > data.actions.length
                        ? data.current_action.position - 1
                        : data.current_action.position;

                data.actions = data.actions.map(
                    (action_2: i_actions.Action): i_actions.Action =>
                        err(() => {
                            if (n(initial_current_action)) {
                                if (
                                    action_2.position > initial_current_action.position &&
                                    action_2.position <= data.current_action.position
                                ) {
                                    action_2.position -= 1;
                                } else if (
                                    action_2.position < initial_current_action.position &&
                                    action_2.position >= data.current_action.position
                                ) {
                                    action_2.position += 1;
                                }
                            }

                            return action_2;
                        }, 'cot_1056'),
                );

                data.actions = data.actions.map(
                    (action_2: i_actions.Action): i_actions.Action =>
                        err(() => {
                            if (action_2.id === data.current_action.id) {
                                action_2 = { ...data.current_action };
                            }

                            return action_2;
                        }, 'cot_1056'),
                );

                const new_current_action_id: string = { ...data.current_action }.id;

                data.settings.current_action_id = undefined;
                data.settings.current_action_id = new_current_action_id;
                d_actions_shared.Actions.i().initial_current_action = { ...data.current_action };
                data.actions =
                    d_actions_shared.Actions.i().create_indexed_action_name_and_sort_actions({
                        actions: data.actions,
                    });
                d_data.Manipulation.i().update_settings();

                show_notification({
                    error_msg_key: 'action_updated_notification',
                    notification_type: 'positive',
                    hide_delay: 800,
                });
            } else {
                show_notification({
                    error_msg_key: 'unable_to_update_action_notification',
                    notification_type: 'negative',
                    hide_delay: 2000,
                });
            }
        }, 'cot_1055');

    public delete = (): Promise<void> =>
        err_async(async () => {
            if (data.actions.length === 1) {
                show_notification({
                    error_msg_key: 'the_last_action_cannot_be_deleted_notification',
                    notification_type: 'negative',
                    hide_delay: 1500,
                });
            } else {
                const { initial_current_action } = d_actions_shared.Actions.i();

                data.actions = data.actions.filter((action_2: i_actions.Action): boolean =>
                    err(
                        () =>
                            n(initial_current_action) && action_2.id !== initial_current_action.id,
                        'cot_1058',
                    ),
                );

                data.actions = data.actions.map(
                    (action_2: i_actions.Action): i_actions.Action =>
                        err(() => {
                            if (
                                n(initial_current_action) &&
                                action_2.position > initial_current_action.position
                            ) {
                                action_2.position -= 1;
                            }

                            return action_2;
                        }, 'cot_1059'),
                );

                const previous_action_i: number = data.actions.findIndex(
                    (action_2: i_actions.Action): boolean =>
                        err(
                            () =>
                                n(initial_current_action) &&
                                initial_current_action.position - 1 === action_2.position,
                            'cot_1060',
                        ),
                );

                data.current_action = {
                    ...(n(initial_current_action) && initial_current_action.position === 1
                        ? data.actions[0]
                        : data.actions[previous_action_i]),
                };

                const new_current_action_id: string = { ...data.current_action }.id;

                this.update_main_action({ new_current_action_id });

                data.settings.current_action_id = new_current_action_id;
                d_actions_shared.Actions.i().initial_current_action = { ...data.current_action };
                data.actions =
                    d_actions_shared.Actions.i().create_indexed_action_name_and_sort_actions({
                        actions: data.actions,
                    });

                if (n(initial_current_action)) {
                    await ext.storage_remove([initial_current_action.id]);

                    d_data.Manipulation.i().update_settings();

                    show_notification({
                        error_msg_key: 'action_deleted_notification',
                        notification_type: 'positive',
                        hide_delay: 800,
                    });
                }
            }
        }, 'cot_1057');

    private update_main_action = ({
        new_current_action_id,
    }: {
        new_current_action_id: string;
    }): void =>
        err(() => {
            const { initial_current_action } = d_actions_shared.Actions.i();

            if (
                n(initial_current_action) &&
                initial_current_action.id === data.settings.main_action_id
            ) {
                data.settings.main_action_id = undefined;
                data.settings.main_action_id = new_current_action_id;
            }
        }, 'cot_1062');
}
