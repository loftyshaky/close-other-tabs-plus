import { Menus } from 'webextension-polyfill';

import { i_data } from 'shared/internal';
import { s_actions, s_data, s_tabs } from 'background/internal';

we.contextMenus.onClicked.addListener(
    (info: Menus.OnClickData): Promise<void> =>
        err_async(async () => {
            await s_data.Main.i().set_from_storage({ transform: true });

            const action: i_data.Action | undefined = s_actions.Main.i().get_by_id({
                id: info.menuItemId,
            });

            if (n(action)) {
                s_tabs.Actions.i().activate({ action });
            }
        }, 'cnt_1003'),
);
