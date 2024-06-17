import { runInAction } from 'mobx';

import { d_settings, i_data } from 'shared/internal';

export class Actions {
    private static i0: Actions;

    public static i(): Actions {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public current_action_initial: i_data.Action | undefined;

    public extract_current_action = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<i_data.Action> =>
        err_async(async () => {
            const settings_final: i_data.SettingsWrapped = n(settings)
                ? settings
                : await ext.storage_get();

            const current_action: i_data.Action = settings_final[
                settings_final.settings.current_action_id
            ] as i_data.Action;

            return current_action;
        }, 'cot_1050');

    public extract_main_action = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<i_data.Action> =>
        err_async(async () => {
            const settings_final: i_data.SettingsWrapped = n(settings)
                ? settings
                : await ext.storage_get();

            const main_action: i_data.Action = settings_final[
                settings_final.settings.current_action_id
            ] as i_data.Action;

            return main_action;
        }, 'cot_1038');

    public extract_actions = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<i_data.Action[]> =>
        err_async(async () => {
            const settings_final: i_data.SettingsWrapped = n(settings)
                ? settings
                : await ext.storage_get();

            const actions: i_data.Action[] = (
                Object.values(settings_final) as (i_data.Settings & i_data.Action)[]
            ).filter((item: i_data.Settings & i_data.Action): boolean =>
                err(() => !n(item.enable_cut_features), 'cot_1040'),
            );

            const actions_data: i_data.Action[] = this.create_indexed_action_name_and_sort_actions({
                actions: Object.values(actions),
            });

            return actions_data;
        }, 'cot_1039');

    public set_actions = ({
        settings,
    }: {
        settings?: i_data.SettingsWrapped;
    } = {}): Promise<void> =>
        err_async(async () => {
            const current_action: i_data.Action =
                await d_settings.Actions.i().extract_current_action({ settings });
            const main_action: i_data.Action = await d_settings.Actions.i().extract_main_action({
                settings,
            });
            const actions: i_data.Action[] = await d_settings.Actions.i().extract_actions({
                settings,
            });

            runInAction(() =>
                err(() => {
                    data.current_action = current_action;
                    data.main_action = main_action;
                    data.actions = actions;
                }, 'cot_1044'),
            );

            if (!n(d_settings.Actions.i().current_action_initial)) {
                d_settings.Actions.i().current_action_initial = { ...data.current_action };
            }
        }, 'cot_1045');

    public sort_actions = ({ actions }: { actions: i_data.Action[] }): i_data.Action[] =>
        err(
            () =>
                actions
                    .slice()
                    .sort((a: i_data.Action, b: i_data.Action): number =>
                        err(() => a.position - b.position, 'cot_1041'),
                    ),
            'cot_1052',
        );

    public create_indexed_action_name_and_sort_actions = ({
        actions,
    }: {
        actions: i_data.Action[];
    }): i_data.Action[] =>
        err(() => {
            const actions_data: i_data.Action[] = actions.map(
                (item): i_data.Action =>
                    err(() => {
                        (item as i_data.Action).indexed_action_name = `[${item.position}] ${
                            (item as i_data.Action).name
                        }`;

                        return item as i_data.Action;
                    }, 'cot_1042'),
            );

            const actions_data_sorted: i_data.Action[] = this.sort_actions({
                actions: actions_data,
            });

            return actions_data_sorted;
        }, 'cot_1053');

    public remove_indexed_action_name = ({
        actions,
    }: {
        actions: i_data.Action[];
    }): i_data.Action[] =>
        err(() => {
            const actions_without_indexed_action_name: i_data.Action[] = JSON.parse(
                JSON.stringify(actions),
            ).map(
                (item: i_data.Action): i_data.Action =>
                    err(() => {
                        delete item.indexed_action_name;

                        return item;
                    }, 'cot_1042'),
            );

            return actions_without_indexed_action_name;
        }, 'cot_1054');
}
