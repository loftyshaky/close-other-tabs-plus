import { Tabs } from 'webextension-polyfill';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_tab_count = (): Promise<void> =>
        err_async(async () => {
            if (data.settings.prefs.tab_counter_is_visible) {
                const tabs: Tabs.Tab[] = await we.tabs.query({ currentWindow: true });

                await we.action.setBadgeText({ text: tabs.length.toString() });
            } else {
                await we.action.setBadgeText({ text: '' });
            }
        }, 'cot_1087');

    public set_color = (): Promise<void> =>
        err_async(async () => {
            await we.action.setBadgeBackgroundColor({ color: '#2f86de' });
            await we.action.setBadgeTextColor({ color: 'white' });
        }, 'cot_1089');
}

export const Badge = Class.get_instance();
