import { i_actions } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
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

export const Action = Class.get_instance();
