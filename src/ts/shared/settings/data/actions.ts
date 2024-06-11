import { runInAction } from 'mobx';

import { d_settings, i_data } from 'shared/internal';

export class Actions {
    private static i0: Actions;

    public static i(): Actions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public extract_main_action = (): Promise<i_data.Action> =>
        err_async(async () => {
            const settings = await ext.storage_get();

            const main_action: i_data.Action = settings[data.settings.main_action];

            return main_action;
        }, 'cot_1038');

    public extract_actions = (): Promise<i_data.ActionData[]> =>
        err_async(async () => {
            const settings = await ext.storage_get();

            const actions: (i_data.Settings & i_data.ActionData)[] = Object.entries(settings).map(
                ([key, val]: [string, any]): i_data.Settings & i_data.ActionData =>
                    err(() => {
                        val.key = key;
                        val.indexed_action_name = `[${val.action_position}] ${val.action_name}`;

                        return val as i_data.Settings & i_data.ActionData;
                    }, 'cot_1042'),
            );

            const actions_data: i_data.ActionData[] = actions.filter(
                (item: i_data.Settings & i_data.Action): boolean =>
                    err(() => !n(item.enable_cut_features), 'cot_1040'),
            );

            actions_data.sort((a: i_data.Action, b: i_data.Action): number =>
                err(() => a.action_position - b.action_position, 'cot_1041'),
            );

            return actions_data;
        }, 'cot_1039');

    public set_actions = (): Promise<void> =>
        err_async(async () => {
            const main_action: i_data.Action = await d_settings.Actions.i().extract_main_action();
            const actions: i_data.ActionData[] = await d_settings.Actions.i().extract_actions();

            runInAction(() =>
                err(() => {
                    data.main_action = main_action;
                    data.actions = actions;
                }, 'cot_1044'),
            );
        }, 'cot_1045');
}
