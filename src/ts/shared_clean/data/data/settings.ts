import { d_actions, i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_actions = ({
        settings,
    }: {
        settings: i_data.SettingsWrapped | undefined;
    }): Promise<void> =>
        err_async(async () => {
            await d_actions.Actions.set({ settings });

            d_actions.Actions.initial_current_action = { ...data.current_action };
        }, 'cot_1036');
}

export const Settings = Class.get_instance();
