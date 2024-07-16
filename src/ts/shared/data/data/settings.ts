import { d_settings } from '@loftyshaky/shared';
import { d_actions, i_data } from 'shared/internal';

export class Settings {
    private static i0: Settings;

    public static i(): Settings {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.SettingsWrapped = await d_settings.Main.i().set_from_storage();

            await this.set_actions({ settings });
        }, 'cot_1035');

    public set_actions = ({
        settings,
    }: {
        settings: i_data.SettingsWrapped | undefined;
    }): Promise<void> =>
        err_async(async () => {
            await d_actions.Actions.i().set({ settings });

            d_actions.Actions.i().initial_current_action = { ...data.current_action };
        }, 'cot_1036');
}
