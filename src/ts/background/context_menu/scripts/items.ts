import { s_data } from '@loftyshaky/shared';

import { i_actions, i_data } from 'shared/internal';

export class Items {
    private static i0: Items;

    public static i(): Items {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public create_itmes = (): Promise<void> =>
        err_async(async () => {
            await we.contextMenus.removeAll();

            const settings: i_data.SettingsWrapped = await s_data.Cache.i().get_data();

            const contexts_on_page: string[] = (settings.settings as i_data.Settings)
                .enable_on_page_context_menu
                ? ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio']
                : [];
            const contexts_action: string[] = (settings.settings as i_data.Settings)
                .enable_action_context_menu
                ? ['action']
                : [];

            data.actions.forEach((action: i_actions.Action): void =>
                err(() => {
                    we.contextMenus.create({
                        id: action.id,
                        title: action.name,
                        contexts: [...contexts_on_page, ...contexts_action],
                    });
                }, 'cot_1065'),
            );
        }, 'cot_1063');
}
