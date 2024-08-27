import { i_actions, i_data } from 'shared_clean/internal';

export interface Settings {
    [index: string]: i_data.Prefs | i_actions.Action;
}
