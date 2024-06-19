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
    hostnames: string;
    window_url_comparison: boolean;
    url_whitelist: string[];
    url_blacklist: string[];
    open_new_tab_after_action: boolean;
    urls_after_action: string[];
    indexed_action_name?: string;
}
