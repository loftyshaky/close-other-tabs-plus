export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public create_objs_background = (): void =>
        err(() => {
            data.current_action = {};
            data.main_action = {};
            data.actions = [];
        }, 'cot_1064');
}
