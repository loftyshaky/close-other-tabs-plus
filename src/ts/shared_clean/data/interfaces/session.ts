import { i_actions, i_data } from 'shared_clean/internal';

export interface Session {
    settings: { [index: string]: i_data.Prefs | i_actions.Action };
    current_action: i_actions.Action;
    main_action: i_actions.Action;
    actions: i_actions.Action[];
    updating_settings: boolean;
}
