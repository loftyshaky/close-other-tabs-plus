import { i_actions } from 'shared_clean/internal';
import { s_actions, s_data } from 'background/internal';

we.commands.onCommand.addListener((command: string) =>
    err_async(async () => {
        await s_data.Manipulation.set_from_storage({ transform: true });

        const command_i: number = +command.split('_')[1] - 1;
        const hotkey_action: i_actions.Action = data.actions[command_i];

        if (n(hotkey_action)) {
            s_actions.Activation.activate({ action: hotkey_action });
        }
    }, 'cot_1129'),
);
