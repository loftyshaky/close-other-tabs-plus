import { i_actions } from 'shared/internal';

export class Items {
    private static i0: Items;

    public static i(): Items {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public create_itmes = (): Promise<void> =>
        err_async(async () => {
            await we.contextMenus.removeAll();

            data.actions.forEach((action: i_actions.Action): void =>
                err(() => {
                    we.contextMenus.create({
                        id: action.id,
                        title: action.name,
                        contexts: ['all'],
                    });
                }, 'cot_1065'),
            );
        }, 'cot_1063');
}
