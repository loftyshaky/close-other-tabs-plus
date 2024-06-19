import { Windows, Tabs } from 'webextension-polyfill';

import { i_tabs } from 'background/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get_all = (): Promise<Tabs.Tab[]> =>
        err_async(async () => {
            const tabs: Tabs.Tab[] = await we.tabs.query({});

            return tabs;
        }, 'cot_1066');

    public get_current_tabs = (): Promise<i_tabs.CurrentTabs> =>
        err_async(async () => {
            const windows: Windows.Window[] = await we.windows.getAll();
            const current_tabs: i_tabs.CurrentTabs = {};

            windows.forEach(
                (window: Windows.Window): Promise<void> =>
                    err_async(async () => {
                        const tabs: Tabs.Tab[] = await we.tabs.query({ windowId: window.id });

                        const current_tab: Tabs.Tab | undefined = tabs.find(
                            (tab: Tabs.Tab): boolean => tab.active,
                        );

                        if (n(window.id) && n(current_tab)) {
                            current_tabs[window.id] = current_tab;
                        }
                    }, 'cot_1073'),
            );

            return current_tabs;
        }, 'cot_1072');

    public get_href_of_tab = ({ tab }: { tab: Tabs.Tab }): string =>
        err(() => (n(tab.url) ? new URL(tab.url).href : ''), 'cot_1074');

    public get_hostname_of_tab = ({ tab }: { tab: Tabs.Tab }): string =>
        err(() => (n(tab.url) ? new URL(tab.url).hostname : ''), 'cot_1075');
}
