import { s_data, s_actions } from 'background/internal';

we.action.onClicked.addListener(
    (): Promise<void> =>
        err_async(async () => {
            await s_data.Manipulation.i().set_from_storage({ transform: true });

            s_actions.Activation.i().activate({ action: data.main_action });
        }, 'cot_1127'),
);
