export class Actions {
    private static i0: Actions;

    public static i(): Actions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public create_test_actions = (): void =>
        err(() => {
            const confirmed_create_test_actione: boolean = globalThis.confirm(
                ext.msg('create_test_actions_confirm'),
            );

            if (confirmed_create_test_actione) {
                ext.send_msg({ msg: 'create_test_actions' });
            }
        }, 'cot_1112');
}
