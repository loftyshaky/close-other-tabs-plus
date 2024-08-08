import { t, s_data } from '@loftyshaky/shared/shared_clean';
import { i_data, i_actions } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public initial_current_action: i_actions.Action | undefined;

    private extract_current = ({
        settings,
    }: {
        settings: i_data.SettingsWrapped;
    }): Promise<i_actions.Action> =>
        err_async(async () => {
            const current_action: i_actions.Action = settings[
                settings.settings.current_action_id
            ] as i_actions.Action;

            return current_action;
        }, 'cot_1050');

    private extract_main = ({
        settings,
    }: {
        settings: i_data.SettingsWrapped;
    }): Promise<i_actions.Action> =>
        err_async(async () => {
            const main_action: i_actions.Action = settings[
                settings.settings.main_action_id
            ] as i_actions.Action;

            return main_action;
        }, 'cot_1038');

    private extract = ({
        settings,
    }: {
        settings: i_data.SettingsWrapped;
    }): Promise<i_actions.Action[]> =>
        err_async(async () => {
            delete settings.settings;
            delete settings.current_action;
            delete settings.main_action;
            delete settings.actions;
            delete settings.updating_settings;
            delete settings.created_initial_context_menus_once;

            const actions_data: i_actions.Action[] =
                this.create_indexed_action_name_and_sort_actions({
                    actions: Object.values(settings) as i_actions.Action[],
                });

            return actions_data;
        }, 'cot_1039');

    public set = ({
        settings,
        from_cache = false,
    }: {
        settings?: i_data.SettingsWrapped;
        from_cache?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const session_settings: i_data.SettingsWrapped = await s_data.Cache.get_data();
            const actions_are_in_cache: boolean =
                n(session_settings) && n(session_settings.current_action);
            const settings_final = from_cache
                ? session_settings
                : settings || (await ext.storage_get());

            const current_action: i_actions.Action = await this.extract_current({
                settings: settings_final,
            });
            const main_action: i_actions.Action = await this.extract_main({
                settings: settings_final,
            });
            const actions: i_actions.Action[] = await this.extract({
                settings: settings_final,
            });

            const { runInAction } =
                page === 'background'
                    ? {
                          runInAction: (callback: t.CallbackVoid) => {
                              callback();
                          },
                      }
                    : await import('mobx');

            runInAction(() =>
                err(() => {
                    data.current_action = current_action;
                    data.main_action = main_action;
                    data.actions = actions;
                }, 'cot_1044'),
            );

            if (!actions_are_in_cache) {
                await we.storage.session.set({ current_action, main_action, actions });
            }

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
                    }, 'cot_1126'),
            );

            return actions_without_indexed_action_name;
        }, 'cot_1054');
}

export const Actions = Class.get_instance();
