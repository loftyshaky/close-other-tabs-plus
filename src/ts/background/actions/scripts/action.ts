import { i_actions } from 'shared/internal';

export class Action {
    private static i0: Action;

    public static i(): Action {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get_by_id = ({ id }: { id: string | number }): i_actions.Action | undefined =>
        err(() => {
            const action: i_actions.Action | undefined = data.actions.find(
                (action_2: i_actions.Action): boolean => err(() => action_2.id === id, 'cot_1071'),
            );

            return action;
        }, 'cot_1070');
}
