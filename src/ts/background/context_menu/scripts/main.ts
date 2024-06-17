import { i_data } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public create_itmes = (): Promise<void> =>
        err_async(async () => {
            await we.contextMenus.removeAll();

            data.actions.forEach((action: i_data.Action): void =>
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
