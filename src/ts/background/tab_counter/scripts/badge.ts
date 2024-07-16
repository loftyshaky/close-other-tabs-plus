import { Tabs } from 'webextension-polyfill';

import { s_data } from '@loftyshaky/shared';
import { i_data } from 'shared/internal';

export class Badge {
    private static i0: Badge;

    public static i(): Badge {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_tab_count = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.SettingsWrapped = await s_data.Cache.i().get_data();

            if (settings.settings.tab_counter_is_visible) {
                const tabs: Tabs.Tab[] = await we.tabs.query({ currentWindow: true });

                await we.action.setBadgeText({ text: tabs.length.toString() });
            } else {
                await we.action.setBadgeText({ text: '' });
            }
        }, 'cot_1087');

    public set_color = (): Promise<void> =>
        err_async(async () => {
            await we.action.setBadgeBackgroundColor({ color: '#249c3e' });
            await we.action.setBadgeTextColor({ color: 'white' });
        }, 'cot_1089');
}
