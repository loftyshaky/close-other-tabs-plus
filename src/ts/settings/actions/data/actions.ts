class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
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

export const Actions = Class.get_instance();
