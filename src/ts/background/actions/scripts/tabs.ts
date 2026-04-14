import { Windows, Tabs as TabsType } from 'webextension-polyfill';
import psl, { ParsedDomain } from 'psl';

import { i_tabs } from 'background/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
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

    public get_root_domain_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => {
            const hostname: string = n(tab.url) ? new URL(tab.url).hostname : '';
            const parsed = psl.parse(this.get_host_of_tab({ tab }));
            const { domain } = parsed as ParsedDomain;
            const hostname_is_ip_address: boolean =
                /^[0-9a-fA-F:.]+$/.test(hostname) && !/^[a-zA-Z]+$/.test(hostname);
            const domain_final: string | null =
                hostname === 'localhost' || hostname_is_ip_address ? hostname : domain;

            return n(tab.url) && n(domain_final) ? domain_final : '';
        }, 'cot_1121');

    public get_subdomains_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => {
            const root_domain: string = this.get_root_domain_of_tab({ tab });
            const parsed = psl.parse(this.get_host_of_tab({ tab }));
            const { subdomain } = parsed as ParsedDomain;

            return n(subdomain) ? subdomain : '';
        }, 'cot_1075');

    public get_port_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => (n(tab.url) ? new URL(tab.url).port : ''), 'cot_1143');

    private get_host_of_tab = ({ tab }: { tab: TabsType.Tab }): string =>
        err(() => (n(tab.url) ? new URL(tab.url).host : ''), 'cot_1144');
}

export const Tabs = Class.get_instance();
