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
        makeObservable<this, 'update_main_action' | 'transfrom_textarea_input_into_arrays'>(this, {
            create_action: action,
            update_action: action,
            delete_action: action,
            update_main_action: action,
            transfrom_textarea_input_into_arrays: action,
        });
    }

    public create_action = (): void =>
        err(() => {
            if (d_sections.Val.i().input_is_valid) {
                this.transfrom_textarea_input_into_arrays();

                const action_with_highest_position: i_data.Action | undefined = _.maxBy(
                    data.actions,
                    'position',
                ) as i_data.Action | undefined;

                if (n(action_with_highest_position)) {
                    data.current_action.id = x.unique_id();
                    const new_action: i_data.Action = { ...data.current_action };
                    data.current_action.indexed_action_name = `[${data.current_action.position}] ${new_action.name}`;

                    data.actions = data.actions.map(
                        (action_2: i_data.Action): i_data.Action =>
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
                        d_settings.Actions.i().create_indexed_action_name_and_sort_actions({
                            actions: data.actions,
                        });
                    d_settings.Actions.i().current_action_initial = { ...data.current_action };
                    d_sections.Val.i().update_settings();

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

    public update_action = (): void =>
        err(() => {
            if (d_sections.Val.i().input_is_valid) {
                this.transfrom_textarea_input_into_arrays();

                const { current_action_initial } = d_settings.Actions.i();
                data.current_action.position =
                    data.current_action.position > data.actions.length
                        ? data.current_action.position - 1
                        : data.current_action.position;

                data.actions = data.actions.map(
                    (action_2: i_data.Action): i_data.Action =>
                        err(() => {
                            if (n(current_action_initial)) {
                                if (
                                    action_2.position > current_action_initial.position &&
                                    action_2.position <= data.current_action.position
                                ) {
                                    action_2.position -= 1;
                                } else if (
                                    action_2.position < current_action_initial.position &&
                                    action_2.position >= data.current_action.position
                                ) {
                                    action_2.position += 1;
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

                const new_current_action_id: string = { ...data.current_action }.id;

                this.update_main_action({ new_current_action_id });

                data.settings.current_action_id = undefined;
                data.settings.current_action_id = new_current_action_id;
                d_settings.Actions.i().current_action_initial = { ...data.current_action };
                data.actions = d_settings.Actions.i().create_indexed_action_name_and_sort_actions({
                    actions: data.actions,
                });
                d_sections.Val.i().update_settings();

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

    public delete_action = (): Promise<void> =>
        err_async(async () => {
            if (data.actions.length === 1) {
                show_notification({
                    error_msg_key: 'the_last_action_cannot_be_deleted_notification',
                    notification_type: 'negative',
                    hide_delay: 1500,
                });
            } else {
                const { current_action_initial } = d_settings.Actions.i();

                data.actions = data.actions.filter((action_2: i_data.Action): boolean =>
                    err(
                        () =>
                            n(current_action_initial) && action_2.id !== current_action_initial.id,
                        'cot_1058',
                    ),
                );

                data.actions = data.actions.map(
                    (action_2: i_data.Action): i_data.Action =>
                        err(() => {
                            if (
                                n(current_action_initial) &&
                                action_2.position > current_action_initial.position
                            ) {
                                action_2.position -= 1;
                            }

                            return action_2;
                        }, 'cot_1059'),
                );

                const previous_action_i: number = data.actions.findIndex(
                    (action_2: i_data.Action): boolean =>
                        err(
                            () =>
                                n(current_action_initial) &&
                                current_action_initial.position - 1 === action_2.position,
                            'cot_1060',
                        ),
                );

                data.current_action = {
                    ...(n(current_action_initial) && current_action_initial.position === 1
                        ? data.actions[0]
                        : data.actions[previous_action_i]),
                };

                const new_current_action_id: string = { ...data.current_action }.id;

                this.update_main_action({ new_current_action_id });

                data.settings.current_action_id = new_current_action_id;
                d_settings.Actions.i().current_action_initial = { ...data.current_action };
                data.actions = d_settings.Actions.i().create_indexed_action_name_and_sort_actions({
                    actions: data.actions,
                });

                if (n(current_action_initial)) {
                    await ext.storage_remove([current_action_initial.id]);

                    d_sections.Val.i().update_settings();

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
            const { current_action_initial } = d_settings.Actions.i();

            if (
                n(current_action_initial) &&
                current_action_initial.current_action_id === data.settings.main_action_id
            ) {
                data.settings.main_action_id = undefined;
                data.settings.main_action_id = new_current_action_id;
            }
        }, 'cot_1062');

    private transfrom_textarea_input_into_arrays = (): void =>
        err(() => {
            const current_action_updates: any = {};

            Object.entries(data.current_action).forEach(([key, val]: any) => {
                if (d_sections.Val.i().is_textarea_input({ input_name: key })) {
                    const arr_val: string[] = n(val.split) ? val.split(',') : val;

                    current_action_updates[key] =
                        val.length === 0 ? [] : _.reject(_.map(arr_val, _.trim), _.isEmpty);
                }
            });

            data.current_action = { ...data.current_action, ...current_action_updates };
        }, 'cot_1085');
}
