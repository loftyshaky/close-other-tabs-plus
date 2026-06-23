import type { Tabs, Windows } from 'webextension-polyfill';

import reject from 'lodash/reject';

import { s_links } from '@loftyshaky/shared/shared_clean';
import type { i_error, t } from '@loftyshaky/shared/shared_clean';
import { s_actions } from 'background/internal';
import type { i_actions } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public activate = ({ action }: { action: i_actions.Action }): Promise<void> =>
        err_async(async () => {
            const open_urls = (): Promise<void> =>
                err_async(async () => {
                    const open_urls_inner = ({ window_id }: { window_id: number }): Promise<void> =>
                        err_async(async () => {
                            //
                            for (const url of urls_to_open) {
                                await we.tabs.create({
                                    windowId: window_id,
                                    url,
                                });
                            }
                        }, 'cot_1109');

                    const new_tab_link = s_links.Browser.new_tab[env.browser];
                    const urls_to_open: string[] = [
                        ...action.urls_after_action,
                        ...(action.open_new_tab_after_action ? [new_tab_link] : []),
                    ];

                    if (n(current_tab)) {
                        const windows: Windows.Window[] = await we.windows.getAll();
                        const current_windows_last: Windows.Window | undefined = windows.find(
                            (window: Windows.Window): boolean =>
                                err(
                                    () => n(window.id) && window.id === current_tab.windowId,
                                    'cot_1111',
                                ),
                        );

                        if (n(current_windows_last)) {
                            const windows_no_current: Windows.Window[] = reject(windows, {
                                id: current_windows_last.id,
                            });
                            const windows_current_last = [
                                ...windows_no_current,
                                current_windows_last,
                            ];

                            for (const window of windows_current_last) {
                                const is_current_window: boolean =
                                    window.id === current_tab.windowId;

                                const matched_window: boolean =
                                    action.in_which_windows_to_open_tabs === 'all_windows' ||
                                    (action.in_which_windows_to_open_tabs === 'current_window' &&
                                        is_current_window) ||
                                    (action.in_which_windows_to_open_tabs === 'other_windows' &&
                                        !is_current_window);

                                if (matched_window && n(window.id)) {
                                    await open_urls_inner({ window_id: window.id });
                                }
                            }
                        }
                    }
                }, 'cot_1099');

            const close_group_ungroup = ({ ids }: { ids: number | number[] }): Promise<void> =>
                err_async(async () => {
                    if (action.type === 'close') {
                        try {
                            await we.tabs.remove(ids);
                        } catch (error_obj: unknown) {
                            if (n(error_obj)) {
                                show_err_ribbon(error_obj as i_error.ErrorObj, 'cot_1155', {
                                    silent: true,
                                });
                            }
                        }
                    } else if (action.type === 'group') {
                        try {
                            await we.tabs.group({ tabIds: ids });
                        } catch (error_obj: unknown) {
                            if (n(error_obj)) {
                                show_err_ribbon(error_obj as i_error.ErrorObj, 'cot_1156', {
                                    silent: true,
                                });
                            }
                        }
                    } else if (action.type === 'ungroup') {
                        try {
                            await we.tabs.ungroup(ids);
                        } catch (error_obj: unknown) {
                            if (n(error_obj)) {
                                show_err_ribbon(error_obj as i_error.ErrorObj, 'cot_1157', {
                                    silent: true,
                                });
                            }
                        }
                    }
                }, 'cot_1160');

            const current_tab: Tabs.Tab | undefined = await ext.get_active_tab();
            const tabs: Tabs.Tab[] = await s_actions.Tabs.get_all();

            if (n(current_tab)) {
                const href_of_current_tab: string = s_actions.Tabs.get_href_of_tab({
                    tab: current_tab,
                });
                const root_domain_of_current_tab: string = s_actions.Tabs.get_root_domain_of_tab({
                    tab: current_tab,
                });
                const subdomains_of_current_tab: string = s_actions.Tabs.get_subdomains_of_tab({
                    tab: current_tab,
                });
                const port_of_current_tab: string = s_actions.Tabs.get_port_of_tab({
                    tab: current_tab,
                });
                const current_tab_is_grouped: boolean =
                    (current_tab as Tabs.Tab).groupId !== -1 ||
                    ((current_tab as t.Any).spaceId && (current_tab as t.Any).spaceId !== -1); // spaceId is a property in Yandex browser.

                const tabs_to_activate: Tabs.Tab[] = tabs.filter((tab: Tabs.Tab): boolean =>
                    err(() => {
                        const is_in_current_window: boolean = tab.windowId === current_tab.windowId;
                        const is_in_current_workspace: boolean =
                            (tab as t.Any).workspaceId === (current_tab as t.Any).workspaceId; // This property exist in Opera.
                        const is_highlighted: boolean = tab.highlighted; // if tab is selected

                        const is_grouped: boolean = (tab as Tabs.Tab).groupId !== -1;
                        const is_grouped_space: boolean =
                            n((current_tab as t.Any).spaceId) &&
                            (current_tab as t.Any).spaceId !== -1;
                        const is_in_current_group: boolean =
                            (is_grouped &&
                                (tab as Tabs.Tab).groupId === (current_tab as Tabs.Tab).groupId) ||
                            (is_grouped_space &&
                                (tab as t.Any).spaceId === (current_tab as t.Any).spaceId);

                        if (n(tab.windowId)) {
                            const url_cond_comparison = ({
                                url_1,
                                url_2,
                            }: {
                                url_1: string;
                                url_2: string;
                            }): boolean => err(() => url_1 === url_2, 'cot_1118');

                            const url_cond_inner = ({
                                key_comparison_1 = '',
                                key_comparison_2 = '',
                                cond,
                                cond_comparison_1 = false,
                                cond_comparison_2 = false,
                            }: {
                                key_comparison_1?: string;
                                key_comparison_2?: string;
                                cond: boolean;
                                cond_comparison_1?: boolean;
                                cond_comparison_2?: boolean;
                            }): boolean =>
                                err(
                                    () =>
                                        cond &&
                                        (key_comparison_1 === '' ||
                                            !action[key_comparison_1] ||
                                            (Boolean(action[key_comparison_1]) &&
                                                cond_comparison_1)) &&
                                        (key_comparison_2 === '' ||
                                            !action[key_comparison_2] ||
                                            (Boolean(action[key_comparison_2]) &&
                                                cond_comparison_2)),
                                    'cot_1145',
                                );

                            const url_cond_current = ({
                                key,
                                key_comparison_1 = '',
                                key_comparison_2 = '',
                                cond_1,
                                cond_2,
                                cond_comparison_1_1 = false,
                                cond_comparison_1_2 = false,
                                cond_comparison_2_1 = false,
                                cond_comparison_2_2 = false,
                            }: {
                                key: string;
                                key_comparison_1?: string;
                                key_comparison_2?: string;
                                cond_1: boolean;
                                cond_2: boolean;
                                cond_comparison_1_1?: boolean;
                                cond_comparison_1_2?: boolean;
                                cond_comparison_2_1?: boolean;
                                cond_comparison_2_2?: boolean;
                            }): boolean =>
                                err(
                                    () =>
                                        action.urls === key &&
                                        ((!action.window_url_comparison &&
                                            url_cond_inner({
                                                key_comparison_1,
                                                key_comparison_2,
                                                cond: cond_1,
                                                cond_comparison_1: cond_comparison_1_1,
                                                cond_comparison_2: cond_comparison_2_1,
                                            })) ||
                                            (action.window_url_comparison &&
                                                url_cond_inner({
                                                    key_comparison_1,
                                                    key_comparison_2,
                                                    cond: cond_2,
                                                    cond_comparison_1: cond_comparison_1_2,
                                                    cond_comparison_2: cond_comparison_2_2,
                                                })) ||
                                            found_url_of_whitelist),
                                    'cot_1119',
                                );

                            const url_cond_any_except = ({
                                key,
                                key_comparison_1 = '',
                                key_comparison_2 = '',
                                cond_1,
                                cond_2,
                                cond_comparison_1_1 = false,
                                cond_comparison_1_2 = false,
                                cond_comparison_2_1 = false,
                                cond_comparison_2_2 = false,
                            }: {
                                key: string;
                                key_comparison_1?: string;
                                key_comparison_2?: string;
                                cond_1: boolean;
                                cond_2: boolean;
                                cond_comparison_1_1?: boolean;
                                cond_comparison_1_2?: boolean;
                                cond_comparison_2_1?: boolean;
                                cond_comparison_2_2?: boolean;
                            }): boolean =>
                                err(
                                    () =>
                                        action.urls === key &&
                                        ((!action.window_url_comparison &&
                                            !url_cond_inner({
                                                key_comparison_1,
                                                key_comparison_2,
                                                cond: cond_1,
                                                cond_comparison_1: cond_comparison_1_1,
                                                cond_comparison_2: cond_comparison_2_1,
                                            })) ||
                                            (action.window_url_comparison &&
                                                !url_cond_inner({
                                                    key_comparison_1,
                                                    key_comparison_2,
                                                    cond: cond_2,
                                                    cond_comparison_1: cond_comparison_1_2,
                                                    cond_comparison_2: cond_comparison_2_2,
                                                })) ||
                                            found_url_of_whitelist),

                                    'cot_1120',
                                );
                            const current_tab_of_current_window_and_workspace:
                                | Tabs.Tab
                                | undefined =
                                s_actions.Tabs.get_current_tab_of_current_window_and_workspace({
                                    tabs,
                                    tab,
                                });

                            let found_url_of_whitelist: boolean = false;

                            if (n(current_tab_of_current_window_and_workspace)) {
                                const is_current_tab_of_current_window_and_workspace: boolean =
                                    tab.id === current_tab_of_current_window_and_workspace.id;
                                const href_of_this_tab: string = s_actions.Tabs.get_href_of_tab({
                                    tab,
                                });
                                const href_of_current_tab_of_current_window_and_workspace: string =
                                    s_actions.Tabs.get_href_of_tab({
                                        tab: current_tab_of_current_window_and_workspace,
                                    });
                                const root_domain_of_this_tab: string =
                                    s_actions.Tabs.get_root_domain_of_tab({
                                        tab,
                                    });
                                const root_domain_of_current_tab_of_current_window_and_workspace: string =
                                    s_actions.Tabs.get_root_domain_of_tab({
                                        tab: current_tab_of_current_window_and_workspace,
                                    });
                                const subdomains_of_this_tab: string =
                                    s_actions.Tabs.get_subdomains_of_tab({
                                        tab,
                                    });
                                const subdomains_of_current_tab_of_current_window_and_workspace: string =
                                    s_actions.Tabs.get_subdomains_of_tab({
                                        tab: current_tab_of_current_window_and_workspace,
                                    });
                                const port_of_this_tab: string = s_actions.Tabs.get_port_of_tab({
                                    tab,
                                });
                                const port_of_current_tab_of_current_window_and_workspace: string =
                                    s_actions.Tabs.get_port_of_tab({
                                        tab: current_tab_of_current_window_and_workspace,
                                    });
                                const href_of_this_tab_is_the_same_as_url_1: boolean =
                                    url_cond_comparison({
                                        url_1: href_of_this_tab,
                                        url_2: href_of_current_tab,
                                    });
                                const href_of_this_tab_is_the_same_as_url_2: boolean =
                                    url_cond_comparison({
                                        url_1: href_of_this_tab,
                                        url_2: href_of_current_tab_of_current_window_and_workspace,
                                    });
                                const root_domain_of_this_tab_is_the_same_as_url_1: boolean =
                                    url_cond_comparison({
                                        url_1: root_domain_of_this_tab,
                                        url_2: root_domain_of_current_tab,
                                    });
                                const root_domain_of_this_tab_is_the_same_as_url_2: boolean =
                                    url_cond_comparison({
                                        url_1: root_domain_of_this_tab,
                                        url_2: root_domain_of_current_tab_of_current_window_and_workspace,
                                    });
                                const subdomains_of_this_tab_is_the_same_as_url_1: boolean =
                                    url_cond_comparison({
                                        url_1: subdomains_of_this_tab,
                                        url_2: subdomains_of_current_tab,
                                    }); // subdomains_of_this_tab_is_the_same_as_subdomains_of_current_tab
                                const subdomains_of_this_tab_is_the_same_as_url_2: boolean =
                                    url_cond_comparison({
                                        url_1: subdomains_of_this_tab,
                                        url_2: subdomains_of_current_tab_of_current_window_and_workspace,
                                    }); // subdomains_of_this_tab_is_the_same_as_subdomains_of_current_tab_of_current_window_and_workspace
                                const port_of_this_tab_is_the_same_as_url_1: boolean =
                                    url_cond_comparison({
                                        url_1: port_of_this_tab,
                                        url_2: port_of_current_tab,
                                    });
                                const port_of_this_tab_is_the_same_as_url_2: boolean =
                                    url_cond_comparison({
                                        url_1: port_of_this_tab,
                                        url_2: port_of_current_tab_of_current_window_and_workspace,
                                    });
                                const url_whitelist_is_empty: boolean =
                                    action.url_whitelist.length === 0;
                                const url_blacklist_is_empty: boolean =
                                    action.url_blacklist.length === 0;
                                found_url_of_whitelist = this.list_item_is_present_in_href({
                                    href: href_of_this_tab,
                                    list: action.url_whitelist,
                                });
                                const found_url_of_blacklist: boolean =
                                    this.list_item_is_present_in_href({
                                        href: href_of_this_tab,
                                        list: action.url_blacklist,
                                    });
                                const found_url_of_current_href: boolean = url_cond_current({
                                    key: 'current_url',
                                    cond_1: href_of_this_tab_is_the_same_as_url_1,
                                    cond_2: href_of_this_tab_is_the_same_as_url_2,
                                });
                                const found_url_of_any_href_except_current: boolean =
                                    url_cond_any_except({
                                        key: 'any_url_except_current',
                                        cond_1: href_of_this_tab_is_the_same_as_url_1,
                                        cond_2: href_of_this_tab_is_the_same_as_url_2,
                                    });
                                const found_url_of_root_domain: boolean = url_cond_current({
                                    key: 'current_root_domain',
                                    key_comparison_1: 'include_subdomain_in_comparison',
                                    key_comparison_2: 'include_port_in_comparison',
                                    cond_1: root_domain_of_this_tab_is_the_same_as_url_1,
                                    cond_2: root_domain_of_this_tab_is_the_same_as_url_2,
                                    cond_comparison_1_1:
                                        subdomains_of_this_tab_is_the_same_as_url_1,
                                    cond_comparison_1_2:
                                        subdomains_of_this_tab_is_the_same_as_url_2,
                                    cond_comparison_2_1: port_of_this_tab_is_the_same_as_url_1,
                                    cond_comparison_2_2: port_of_this_tab_is_the_same_as_url_2,
                                });
                                const found_url_of_any_root_domain_except_current: boolean =
                                    url_cond_any_except({
                                        key: 'any_root_domain_except_current',
                                        key_comparison_1: 'include_subdomain_in_comparison',
                                        key_comparison_2: 'include_port_in_comparison',
                                        cond_1: root_domain_of_this_tab_is_the_same_as_url_1,
                                        cond_2: root_domain_of_this_tab_is_the_same_as_url_2,
                                        cond_comparison_1_1:
                                            subdomains_of_this_tab_is_the_same_as_url_1,
                                        cond_comparison_1_2:
                                            subdomains_of_this_tab_is_the_same_as_url_2,
                                        cond_comparison_2_1: port_of_this_tab_is_the_same_as_url_1,
                                        cond_comparison_2_2: port_of_this_tab_is_the_same_as_url_2,
                                    });
                                const found_url_of_current_subdomain: boolean = url_cond_current({
                                    key: 'current_subdomain',
                                    key_comparison_1: 'include_root_domain_in_comparison',
                                    key_comparison_2: 'include_port_in_comparison',
                                    cond_1: subdomains_of_this_tab_is_the_same_as_url_1,
                                    cond_2: subdomains_of_this_tab_is_the_same_as_url_2,
                                    cond_comparison_1_1:
                                        root_domain_of_this_tab_is_the_same_as_url_1,
                                    cond_comparison_1_2:
                                        root_domain_of_this_tab_is_the_same_as_url_2,
                                    cond_comparison_2_1: port_of_this_tab_is_the_same_as_url_1,
                                    cond_comparison_2_2: port_of_this_tab_is_the_same_as_url_2,
                                });
                                const found_url_of_any_subdomain_except_current: boolean =
                                    url_cond_any_except({
                                        key: 'any_subdomain_except_current',
                                        key_comparison_1: 'include_root_domain_in_comparison',
                                        key_comparison_2: 'include_port_in_comparison',
                                        cond_1: subdomains_of_this_tab_is_the_same_as_url_1,
                                        cond_2: subdomains_of_this_tab_is_the_same_as_url_2,
                                        cond_comparison_1_1:
                                            root_domain_of_this_tab_is_the_same_as_url_1,
                                        cond_comparison_1_2:
                                            root_domain_of_this_tab_is_the_same_as_url_2,
                                        cond_comparison_2_1: port_of_this_tab_is_the_same_as_url_1,
                                        cond_comparison_2_2: port_of_this_tab_is_the_same_as_url_2,
                                    });
                                const found_url_of_current_port: boolean = url_cond_current({
                                    key: 'current_port',
                                    key_comparison_1: 'include_root_domain_in_comparison',
                                    key_comparison_2: 'include_subdomain_in_comparison',
                                    cond_1: port_of_this_tab_is_the_same_as_url_1,
                                    cond_2: port_of_this_tab_is_the_same_as_url_2,
                                    cond_comparison_1_1:
                                        root_domain_of_this_tab_is_the_same_as_url_1,
                                    cond_comparison_1_2:
                                        root_domain_of_this_tab_is_the_same_as_url_2,
                                    cond_comparison_2_1:
                                        subdomains_of_this_tab_is_the_same_as_url_1,
                                    cond_comparison_2_2:
                                        subdomains_of_this_tab_is_the_same_as_url_2,
                                });
                                const found_url_of_any_port_except_current: boolean =
                                    url_cond_any_except({
                                        key: 'any_port_except_current',
                                        key_comparison_1: 'include_root_domain_in_comparison',
                                        key_comparison_2: 'include_subdomain_in_comparison',
                                        cond_1: port_of_this_tab_is_the_same_as_url_1,
                                        cond_2: port_of_this_tab_is_the_same_as_url_2,
                                        cond_comparison_1_1:
                                            root_domain_of_this_tab_is_the_same_as_url_1,
                                        cond_comparison_1_2:
                                            root_domain_of_this_tab_is_the_same_as_url_2,
                                        cond_comparison_2_1:
                                            subdomains_of_this_tab_is_the_same_as_url_1,
                                        cond_comparison_2_2:
                                            subdomains_of_this_tab_is_the_same_as_url_2,
                                    });

                                const windows_to_affect: boolean =
                                    action.windows_to_affect === 'all_windows' ||
                                    (action.windows_to_affect === 'current_window' &&
                                        is_in_current_window) ||
                                    (action.windows_to_affect === 'other_windows' &&
                                        !is_in_current_window);
                                const workspaces_to_affect: boolean =
                                    env.browser === 'opera'
                                        ? action.workspaces_to_affect === 'all_workspaces' ||
                                          (action.workspaces_to_affect === 'current_workspace' &&
                                              is_in_current_workspace) ||
                                          (action.workspaces_to_affect === 'other_workspaces' &&
                                              !is_in_current_workspace)
                                        : true;

                                const tabs_to_affect: boolean =
                                    action.tabs_to_affect === 'all_tabs' ||
                                    (action.tabs_to_affect === 'current_tab' && is_highlighted) ||
                                    (!is_current_tab_of_current_window_and_workspace &&
                                        (action.tabs_to_affect === 'other_tabs' ||
                                            (action.tabs_to_affect === 'tabs_to_left' &&
                                                tab.index <
                                                    current_tab_of_current_window_and_workspace.index) ||
                                            (action.tabs_to_affect === 'tabs_to_right' &&
                                                (action.type === 'unpin' ||
                                                    (tab.index >
                                                        current_tab_of_current_window_and_workspace.index &&
                                                        action.type !== 'unpin')))));

                                const pinned_tabs: boolean =
                                    action.type === 'unpin' ||
                                    action.pinned_tabs === 'pinned_and_unpinned' ||
                                    (action.pinned_tabs === 'pinned' &&
                                        (action.type === 'pin' || tab.pinned)) ||
                                    (action.pinned_tabs === 'unpinned' && !tab.pinned);

                                const grouped_tabs: boolean =
                                    (env.browser === 'yandex' ? false : action.type === 'unpin') ||
                                    action.grouped_tabs === 'grouped_and_ungrouped' ||
                                    (action.grouped_tabs === 'grouped' &&
                                        (is_grouped || is_grouped_space)) ||
                                    (action.grouped_tabs === 'ungrouped' &&
                                        (!is_grouped || !is_grouped_space)) ||
                                    (action.grouped_tabs === 'current_group' &&
                                        is_in_current_group) ||
                                    (action.grouped_tabs === 'any_group_except_current' &&
                                        current_tab_is_grouped &&
                                        (is_grouped || is_grouped_space) &&
                                        !is_in_current_group);

                                const found_website_url: boolean =
                                    found_url_of_root_domain ||
                                    found_url_of_any_root_domain_except_current ||
                                    found_url_of_current_subdomain ||
                                    found_url_of_any_subdomain_except_current ||
                                    found_url_of_current_port ||
                                    found_url_of_any_port_except_current;

                                const urls: boolean =
                                    action.urls === 'any_url' ||
                                    found_website_url ||
                                    found_url_of_current_href ||
                                    found_url_of_any_href_except_current;

                                const url_whitelist: boolean =
                                    found_website_url ||
                                    url_whitelist_is_empty ||
                                    found_url_of_whitelist;

                                const url_blacklist: boolean =
                                    !url_whitelist_is_empty ||
                                    (url_whitelist_is_empty &&
                                        (url_blacklist_is_empty || !found_url_of_blacklist));

                                return (
                                    windows_to_affect &&
                                    workspaces_to_affect &&
                                    tabs_to_affect &&
                                    pinned_tabs &&
                                    grouped_tabs &&
                                    urls &&
                                    url_whitelist &&
                                    url_blacklist
                                );
                            }
                        }

                        return false;
                    }, 'cot_1068'),
                );

                await open_urls();

                if (['close', 'group', 'ungroup'].includes(action.type)) {
                    const ids: number[] = tabs_to_activate.flatMap((tab: Tabs.Tab): number[] =>
                        err(() => (n(tab.id) ? [tab.id] : []), 'cot_1147'),
                    );

                    if (env.browser === 'yandex') {
                        ids.forEach(
                            (id: number): Promise<void> =>
                                err_async(async () => {
                                    await close_group_ungroup({ ids: id });
                                }, 'cot_1159'),
                        );
                    } else {
                        await close_group_ungroup({ ids });
                    }
                } else {
                    (action.type === 'unpin'
                        ? tabs_to_activate.reverse()
                        : tabs_to_activate
                    ).forEach(
                        (tab: Tabs.Tab): Promise<void> =>
                            err_async(async () => {
                                if (['pin', 'unpin'].includes(action.type)) {
                                    try {
                                        await we.tabs.update(tab.id, {
                                            pinned: action.type === 'pin',
                                        });
                                    } catch (error_obj: unknown) {
                                        if (n(error_obj)) {
                                            show_err_ribbon(
                                                error_obj as i_error.ErrorObj,
                                                'cot_1158',
                                                {
                                                    silent: true,
                                                },
                                            );
                                        }
                                    }
                                }
                            }, 'cot_1069'),
                    );
                }
            }
        }, 'cot_1067');

    private list_item_is_present_in_href = ({
        href,
        list,
    }: {
        href: string;
        list: string[];
    }): boolean =>
        err(
            () =>
                list.some((list_item: string): boolean =>
                    err(() => href.includes(list_item), 'cot_1077'),
                ),
            'cot_1076',
        );
}

export const Activation = Class.get_instance();
