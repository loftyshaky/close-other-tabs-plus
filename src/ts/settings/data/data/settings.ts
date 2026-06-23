import { d_data } from '@loftyshaky/shared/shared';
import type { i_data } from 'shared_clean/internal';
import { d_actions, s_css_vars } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings =
                (await d_data.Settings.set_from_storage()) as i_data.Settings;

            await d_actions.Actions.set({ settings });
            s_css_vars.CssVars.set();
        }, 'cot_1035');
}

export const Settings = Class.get_instance();
