import { s_actions, s_data } from 'background/internal';

we.action.onClicked.addListener(
    (): Promise<void> =>
        err_async(async () => {
            await s_data.Manipulation.set_from_storage({ transform: true });

            s_actions.Activation.activate({ action: data.main_action });
        }, 'cot_1127'),
);
