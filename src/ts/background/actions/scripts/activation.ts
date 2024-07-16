import _ from 'lodash';
import { Windows, Tabs } from 'webextension-polyfill';

import { i_actions } from 'shared/internal';
import { s_actions, i_tabs } from 'background/internal';

export class Activation {
    private static i0: Activation;

    public static i(): Activation {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public activate = ({ action }: { action: i_actions.Action }): Promise<void> =>
        err_async(async () => {
            const open_urls = (): Promise<void> =>
                err_async(async () => {
                    const open_urls_inner = ({ window_id }: { window_id: number }): Promise<void> =>
                        err_async(async () => {
                            // eslint-disable-next-line no-restricted-syntax
                            for await (const url of urls_to_open) {
                                await we.tabs.create({
                                    windowId: window_id,
                                    url,
                                });
                            }
                        }, 'cot_1109');

                    const urls_to_open: string[] = [
                        ...action.urls_after_action,
                        ...(action.open_new_tab_after_action ? ['chrome://new-tab-page'] : []),
                    ];

                    if (n(current_tab)) {
                        const windows: Windows.Window[] = await we.windows.getAll();
                        const current_windows_last: Windows.Window | undefined = await windows.find(
                            (window: Windows.Window): boolean =>
                                err(
                                    () => n(window.id) && window.id === current_tab.windowId,
                                    'cot_1111',
                                ),
                        );

                        if (n(current_windows_last)) {
                            const windows_no_current: Windows.Window[] = _.reject(windows, {
                                id: current_windows_last.id,
                            });
                            const windows_current_last = [
                                ...windows_no_current,
                                ...[current_windows_last],
                            ];

                            // eslint-disable-next-line no-restricted-syntax
                            for await (const window of windows_current_last) {
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

            const current_tabs: i_tabs.CurrentTabs = await s_actions.Tabs.i().get_current_tabs();
            const current_tab: Tabs.Tab | undefined = await ext.get_active_tab();
            const tabs: Tabs.Tab[] = await s_actions.Tabs.i().get_all();

            if (n(current_tab)) {
                const href_of_current_tab: string = s_actions.Tabs.i().get_href_of_tab({
                    tab: current_tab,
                });
                const domain_of_current_tab: string = s_actions.Tabs.i().get_domain_of_tab({
                    tab: current_tab,
                });
                const hostname_of_current_tab: string = s_actions.Tabs.i().get_hostname_of_tab({
                    tab: current_tab,
                });
                const current_tab_is_grouped: boolean = (current_tab as any).groupId !== -1;

                const tabs_to_activate: Tabs.Tab[] = tabs.filter((tab: Tabs.Tab): boolean =>
                    err(() => {
                        const is_in_current_window: boolean = tab.windowId === current_tab.windowId;
                        const is_highlighted: boolean = tab.highlighted; // if tab is selected
                        const is_grouped: boolean = (tab as any).groupId !== -1;
                        const is_in_current_group: boolean =
                            is_grouped && (tab as any).groupId === (current_tab as any).groupId;

                        if (n(tab.windowId)) {
                            const url_cond_comparison = ({
                                url_1,
                                url_2,
                            }: {
                                url_1: string;
                                url_2: string;
                            }): boolean => err(() => url_1 === url_2, 'cot_1118');

                            const url_cond_current = ({
                                key,
                                cond_1,
                                cond_2,
                            }: {
                                key: string;
                                cond_1: boolean;
                                cond_2: boolean;
                            }): boolean =>
                                err(
                                    () =>
                                        action.urls === key &&
                                        ((!action.window_url_comparison && cond_1) ||
                                            (action.window_url_comparison && cond_2) ||
                                            found_url_of_whitelist),
                                    'cot_1119',
                                );
                            const url_cond_any_except = ({
                                key,
                                cond_1,
                                cond_2,
                            }: {
                                key: string;
                                cond_1: boolean;
                                cond_2: boolean;
                            }): boolean =>
                                err(
                                    () =>
                                        action.urls === key &&
                                        ((!action.window_url_comparison && !cond_1) ||
                                            (action.window_url_comparison && !cond_2)),

                                    'cot_1120',
                                );
                            const current_tab_of_current_window: Tabs.Tab =
                                current_tabs[tab.windowId];
                            const is_current_tab_of_current_window: boolean =
                                tab.id === current_tab_of_current_window.id;
                            const href_of_this_tab: string = s_actions.Tabs.i().get_href_of_tab({
                                tab,
                            });
                            const href_of_current_tab_of_current_window: string =
                                s_actions.Tabs.i().get_href_of_tab({
                                    tab: current_tab_of_current_window,
                                });
                            const domain_of_this_tab: string = s_actions.Tabs.i().get_domain_of_tab(
                                {
                                    tab,
                                },
                            );
                            const domain_of_current_tab_of_current_window: string =
                                s_actions.Tabs.i().get_domain_of_tab({
                                    tab: current_tab_of_current_window,
                                });
                            const hostname_of_this_tab: string =
                                s_actions.Tabs.i().get_hostname_of_tab({
                                    tab,
                                });
                            const hostname_of_current_tab_of_current_window: string =
                                s_actions.Tabs.i().get_hostname_of_tab({
                                    tab: current_tab_of_current_window,
                                });
                            const href_of_this_tab_is_the_same_as_url_1: boolean =
                                url_cond_comparison({
                                    url_1: href_of_this_tab,
                                    url_2: href_of_current_tab,
                                });
                            const href_of_this_tab_is_the_same_as_url_2: boolean =
                                url_cond_comparison({
                                    url_1: href_of_this_tab,
                                    url_2: href_of_current_tab_of_current_window,
                                });
                            const domain_of_this_tab_is_the_same_as_url_1: boolean =
                                url_cond_comparison({
                                    url_1: domain_of_this_tab,
                                    url_2: domain_of_current_tab,
                                });
                            const domain_of_this_tab_is_the_same_as_url_2: boolean =
                                url_cond_comparison({
                                    url_1: domain_of_this_tab,
                                    url_2: domain_of_current_tab_of_current_window,
                                });
                            const hostname_of_this_tab_is_the_same_as_url_1: boolean =
                                url_cond_comparison({
                                    url_1: hostname_of_this_tab,
                                    url_2: hostname_of_current_tab,
                                }); // hostname_of_this_tab_is_the_same_as_hostname_of_current_tab
                            const hostname_of_this_tab_is_the_same_as_url_2: boolean =
                                url_cond_comparison({
                                    url_1: hostname_of_this_tab,
                                    url_2: hostname_of_current_tab_of_current_window,
                                }); // hostname_of_this_tab_is_the_same_as_hostname_of_current_tab_of_current_window
                            const url_whitelist_is_empty: boolean =
                                action.url_whitelist.length === 0;
                            const url_blacklist_is_empty: boolean =
                                action.url_blacklist.length === 0;
                            const found_url_of_whitelist: boolean =
                                this.list_item_is_present_in_href({
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
                            const found_domain_of_current_hostname: boolean = url_cond_current({
                                key: 'current_domain',
                                cond_1: domain_of_this_tab_is_the_same_as_url_1,
                                cond_2: domain_of_this_tab_is_the_same_as_url_2,
                            });
                            const found_url_of_any_domain_except_current: boolean =
                                url_cond_any_except({
                                    key: 'any_domain_except_current',
                                    cond_1: domain_of_this_tab_is_the_same_as_url_1,
                                    cond_2: domain_of_this_tab_is_the_same_as_url_2,
                                });
                            const found_url_of_current_hostname: boolean = url_cond_current({
                                key: 'current_hostname',
                                cond_1: hostname_of_this_tab_is_the_same_as_url_1,
                                cond_2: hostname_of_this_tab_is_the_same_as_url_2,
                            });
                            const found_url_of_any_hostname_except_current: boolean =
                                url_cond_any_except({
                                    key: 'any_hostname_except_current',
                                    cond_1: hostname_of_this_tab_is_the_same_as_url_1,
                                    cond_2: hostname_of_this_tab_is_the_same_as_url_2,
                                });

                            const windows_to_affect: boolean =
                                action.windows_to_affect === 'all_windows' ||
                                (action.windows_to_affect === 'current_window' &&
                                    is_in_current_window) ||
                                (action.windows_to_affect === 'other_windows' &&
                                    !is_in_current_window);

                            const tabs_to_affect: boolean =
                                action.tabs_to_affect === 'all_tabs' ||
                                (action.tabs_to_affect === 'current_tab' && is_highlighted) ||
                                (!is_current_tab_of_current_window &&
                                    (action.tabs_to_affect === 'other_tabs' ||
                                        (action.tabs_to_affect === 'tabs_to_left' &&
                                            tab.index < current_tab_of_current_window.index) ||
                                        (action.tabs_to_affect === 'tabs_to_right' &&
                                            (action.type === 'unpin' ||
                                                (tab.index > current_tab_of_current_window.index &&
                                                    action.type !== 'unpin')))));

                            const pinned_tabs: boolean =
                                action.type === 'unpin' ||
                                action.pinned_tabs === 'pinned_and_unpinned' ||
                                (action.pinned_tabs === 'pinned' &&
                                    (action.type === 'pin' || tab.pinned)) ||
                                (action.pinned_tabs === 'unpinned' && !tab.pinned);

                            const grouped_tabs: boolean =
                                action.type === 'unpin' ||
                                action.grouped_tabs === 'grouped_and_ungrouped' ||
                                (action.grouped_tabs === 'grouped' && is_grouped) ||
                                (action.grouped_tabs === 'ungrouped' && !is_grouped) ||
                                (action.grouped_tabs === 'current_group' && is_in_current_group) ||
                                (action.grouped_tabs === 'any_group_except_current' &&
                                    current_tab_is_grouped &&
                                    is_grouped &&
                                    !is_in_current_group);

                            const urls: boolean =
                                action.urls === 'any_url' ||
                                found_domain_of_current_hostname ||
                                found_url_of_any_domain_except_current ||
                                found_url_of_current_hostname ||
                                found_url_of_any_hostname_except_current ||
                                found_url_of_current_href ||
                                found_url_of_any_href_except_current;

                            const url_whitelist: boolean =
                                url_whitelist_is_empty ||
                                found_url_of_whitelist ||
                                found_url_of_current_hostname ||
                                found_url_of_any_hostname_except_current;

                            const url_blacklist: boolean =
                                action.urls === 'current_hostname' ||
                                !url_whitelist_is_empty ||
                                (url_whitelist_is_empty &&
                                    (url_blacklist_is_empty || !found_url_of_blacklist));

                            return (
                                windows_to_affect &&
                                tabs_to_affect &&
                                pinned_tabs &&
                                grouped_tabs &&
                                urls &&
                                url_whitelist &&
                                url_blacklist
                            );
                        }

                        return false;
                    }, 'cot_1068'),
                );

                await open_urls();

                if (['close', 'group', 'ungroup'].includes(action.type)) {
                    const ids: (number | undefined)[] = _.map(tabs_to_activate, 'id');

                    if (action.type === 'close') {
                        we.tabs.remove(ids);
                    } else if (action.type === 'group') {
                        we.tabs.group({ tabIds: ids });
                    } else if (action.type === 'ungroup') {
                        we.tabs.ungroup(ids);
                    }
                } else {
                    (action.type === 'unpin'
                        ? tabs_to_activate.reverse()
                        : tabs_to_activate
                    ).forEach((tab: Tabs.Tab): void =>
                        err(() => {
                            if (['pin', 'unpin'].includes(action.type)) {
                                we.tabs.update(tab.id, { pinned: action.type === 'pin' });
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
