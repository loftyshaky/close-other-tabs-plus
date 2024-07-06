import { Windows, Tabs as TabsType } from 'webextension-polyfill';
import psl, { ParsedDomain } from 'psl';

import { i_tabs } from 'background/internal';

export class Tabs {
    private static i0: Tabs;

    public static i(): Tabs {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get_all = (): Promise<TabsType.Tab[]> =>
        err_async(async () => {
            const tabs: TabsType.Tab[] = await we.tabs.query({});

            return tabs;
        }, 'cot_1066');

    public get_current_tabs = (): Promise<i_tabs.CurrentTabs> =>
        err_async(async () => {
            const windows: Windows.Window[] = await we.windows.getAll();
            const current_tabs: i_tabs.CurrentTabs = {};

            windows.forEach(
                (window: Windows.Window): Promise<void> =>
                    err_async(async () => {
                        const tabs: TabsType.Tab[] = await we.tabs.query({ windowId: window.id });

                        const current_tab: TabsType.Tab | undefined = tabs.find(
                            (tab: TabsType.Tab): boolean => tab.active,
                        );

                        if (n(window.id) && n(current_tab)) {
                            current_tabs[window.id] = current_tab;
                        }
                    }, 'cot_1073'),
            );

            return current_tabs;
        }, 'cot_1072');

    public get_href_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => (n(tab.url) ? new URL(tab.url).href : ''), 'cot_1074');

    public get_hostname_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => (n(tab.url) ? new URL(tab.url).hostname : ''), 'cot_1075');

    public get_domain_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => {
            const parsed = psl.parse(this.get_hostname_of_tab({ tab }));
            const { domain } = parsed as ParsedDomain;

            return n(tab.url) && n(domain) ? domain : '';
        }, 'cot_1121');
}
