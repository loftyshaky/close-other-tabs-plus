import { d_data } from '@loftyshaky/shared/shared';
import { d_actions, i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings = await d_data.Settings.set_from_storage();

            await d_actions.Actions.set({ settings });
        }, 'cot_1035');
}

export const Data = Class.get_instance();
