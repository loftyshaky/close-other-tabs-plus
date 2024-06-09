export interface Action {
    action_name: string;
    action_position: number;
    action_type: string;
    windows_to_affect: string;
    tabs_to_affect: string;
    pinned_tabs: string;
    grouped_tabs: string;
    domains: string;
    domain_whitelist: string[];
    domain_blacklist: string[];
    open_new_tab_after_action: boolean;
    urls_after_action: string[];
}
