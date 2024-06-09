import { i_data } from 'shared/internal';

export interface action_data extends i_data.Action {
    key: string;
    indexed_action_name: string;
}
