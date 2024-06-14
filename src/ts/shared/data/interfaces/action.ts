export interface Action {
    [key: string]: any;

    id: string;
    name: string;
    position: number;
    type: string;
    windows_to_affect: string;
    tabs_to_affect: string;
    pinned_tabs: string;
    grouped_tabs: string;
    domains: string;
    domain_whitelist: string[];
    domain_blacklist: string[];
    open_new_tab_after_action: boolean;
    urls_after_action: string[];
    indexed_action_name?: string;
}
