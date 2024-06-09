import { i_data } from 'shared/internal';

export class Actions {
    private static i0: Actions;

    public static i(): Actions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public extract_main_action = ({
        settings = undefined,
    }: { settings?: any } = {}): i_data.Action =>
        err(() => {
            const main_action: i_data.Action = settings[settings.settings.main_action];

            return main_action;
        }, 'cot_1038');
}
