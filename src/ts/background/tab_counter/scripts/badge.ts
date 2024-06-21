import { Tabs } from 'webextension-polyfill';

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
            const settings = await ext.storage_get('settings');

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
