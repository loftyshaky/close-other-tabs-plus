import type { ParsedDomain } from 'psl';
import type { Tabs as TabsType } from 'webextension-polyfill';

import psl from 'psl';

import type { t } from '@loftyshaky/shared/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public get_all = (): Promise<TabsType.Tab[]> =>
        err_async(async () => {
            const tabs: TabsType.Tab[] = await we.tabs.query({});

            return tabs;
        }, 'cot_1066');

    public get_current_tab_of_current_window_and_workspace = ({
        tabs,
        tab,
    }: {
        tabs: TabsType.Tab[];
        tab: TabsType.Tab;
    }): TabsType.Tab | undefined =>
        err(() => {
            return tabs.find((tab_2: TabsType.Tab): boolean =>
                err(
                    () =>
                        tab_2.active &&
                        tab_2.windowId === tab.windowId &&
                        (env.browser === 'opera'
                            ? (tab_2 as t.Any).workspaceId === (tab as t.Any).workspaceId
                            : true),
                    'cot_1073',
                ),
            );
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
