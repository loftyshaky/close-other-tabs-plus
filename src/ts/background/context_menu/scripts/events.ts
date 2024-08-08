import { Menus } from 'webextension-polyfill';

import { i_actions } from 'shared_clean/internal';
import { s_actions, s_data } from 'background/internal';

we.contextMenus.onClicked.addListener(
    (info: Menus.OnClickData): Promise<void> =>
        err_async(async () => {
            await s_data.Manipulation.set_from_storage({ transform: true });

            const action: i_actions.Action | undefined = s_actions.Action.get_by_id({
                id: info.menuItemId,
            });

            if (n(action)) {
                s_actions.Activation.activate({ action });
            }
        }, 'cot_1128'),
);
