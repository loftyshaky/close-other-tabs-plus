import { makeObservable, action } from 'mobx';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            create_objs: action,
        });
    }

    public create_objs = (): void =>
        err(() => {
            data.current_action = {};
            data.main_action = {};
            data.actions = {};
        }, 'cot_1037');
}
