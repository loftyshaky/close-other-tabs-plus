import { runInAction } from 'mobx';

import { i_data, i_actions } from 'shared/internal';

export class Actions {
    private static i0: Actions;

    public static i(): Actions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public initial_current_action: i_actions.Action | undefined;

    private extract_current = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<i_actions.Action> =>
        err_async(async () => {
            const settings_final: i_data.SettingsWrapped = n(settings)
                ? settings
                : await ext.storage_get();

            const current_action: i_actions.Action = settings_final[
                settings_final.settings.current_action_id
            ] as i_actions.Action;

            return current_action;
        }, 'cot_1050');

    private extract_main = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<i_actions.Action> =>
        err_async(async () => {
            const settings_final: i_data.SettingsWrapped = n(settings)
                ? settings
                : await ext.storage_get();

            const main_action: i_actions.Action = settings_final[
                settings_final.settings.main_action_id
            ] as i_actions.Action;

            return main_action;
        }, 'cot_1038');

    private extract = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<i_actions.Action[]> =>
        err_async(async () => {
            const settings_final: i_data.SettingsWrapped = n(settings)
                ? settings
                : await ext.storage_get();

            const actions: i_actions.Action[] = (
                Object.values(settings_final) as (i_data.Settings & i_actions.Action)[]
            ).filter((item: i_data.Settings & i_actions.Action): boolean =>
                err(() => !n(item.enable_cut_features), 'cot_1040'),
            );

            const actions_data: i_actions.Action[] =
                this.create_indexed_action_name_and_sort_actions({
                    actions: Object.values(actions),
                });

            return actions_data;
        }, 'cot_1039');

    public set = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<void> =>
        err_async(async () => {
            const current_action: i_actions.Action = await this.extract_current({
                settings,
            });
            const main_action: i_actions.Action = await this.extract_main({
                settings,
            });
            const actions: i_actions.Action[] = await this.extract({
                settings,
            });

            runInAction(() =>
                err(() => {
                    data.current_action = current_action;
                    data.main_action = main_action;
                    data.actions = actions;
                }, 'cot_1044'),
            );

            if (!n(this.initial_current_action)) {
                this.initial_current_action = { ...data.current_action };
            }
        }, 'cot_1045');

    private sort = ({ actions }: { actions: i_actions.Action[] }): i_actions.Action[] =>
        err(
            () =>
                actions
                    .slice()
                    .sort((a: i_actions.Action, b: i_actions.Action): number =>
                        err(() => a.position - b.position, 'cot_1041'),
                    ),
            'cot_1052',
        );

    public create_indexed_action_name_and_sort_actions = ({
        actions,
    }: {
        actions: i_actions.Action[];
    }): i_actions.Action[] =>
        err(() => {
            const actions_data: i_actions.Action[] = actions.map(
                (item): i_actions.Action =>
                    err(() => {
                        (item as i_actions.Action).indexed_action_name = `[${item.position}] ${
                            (item as i_actions.Action).name
                        }`;

                        return item as i_actions.Action;
                    }, 'cot_1042'),
            );

            const actions_data_sorted: i_actions.Action[] = this.sort({
                actions: actions_data,
            });

            return actions_data_sorted;
        }, 'cot_1053');

    public remove_indexed_action_name = ({
        actions,
    }: {
        actions: i_actions.Action[];
    }): i_actions.Action[] =>
        err(() => {
            const actions_without_indexed_action_name: i_actions.Action[] = JSON.parse(
                JSON.stringify(actions),
            ).map(
                (item: i_actions.Action): i_actions.Action =>
                    err(() => {
                        delete item.indexed_action_name;

                        return item;
                    }, 'cot_1042'),
            );

            return actions_without_indexed_action_name;
        }, 'cot_1054');
}
