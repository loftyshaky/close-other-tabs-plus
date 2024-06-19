import { s_data, s_tabs } from 'background/internal';

we.action.onClicked.addListener(
    (): Promise<void> =>
        err_async(async () => {
            await s_data.Main.i().set_from_storage({ transform: true });

            s_tabs.Actions.i().activate({ action: data.main_action });
        }, 'cnt_1003'),
);
