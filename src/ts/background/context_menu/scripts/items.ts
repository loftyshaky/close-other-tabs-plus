import { i_actions } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public create_itmes = (): Promise<void> =>
        err_async(async () => {
            await we.contextMenus.removeAll();

            const contexts_on_page: string[] =
                'prefs' in data.settings && data.settings.prefs.enable_on_page_context_menu
                    ? ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio']
                    : [];
            const contexts_action: string[] =
                'prefs' in data.settings && data.settings.prefs.enable_action_context_menu
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

export const Items = Class.get_instance();
