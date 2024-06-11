import { i_data } from 'shared/internal';

export interface ActionData extends i_data.Action {
    key: string;
    indexed_action_name: string;
}
