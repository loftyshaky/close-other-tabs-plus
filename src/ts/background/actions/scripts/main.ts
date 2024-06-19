import { i_data } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get_by_id = ({ id }: { id: string | number }): i_data.Action | undefined =>
        err(() => {
            const action: i_data.Action | undefined = data.actions.find(
                (action_2: i_data.Action): boolean => err(() => action_2.id === id, 'cot_1071'),
            );

            return action;
        }, 'cot_1070');
}
