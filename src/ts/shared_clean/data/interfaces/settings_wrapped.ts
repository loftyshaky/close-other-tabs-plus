import { i_actions, i_data } from 'shared_clean/internal';

export type SettingsWrapped = { [index: string]: i_data.Settings | i_actions.Action };