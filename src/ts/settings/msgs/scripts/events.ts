import { t } from '@loftyshaky/shared/shared';
import { d_actions } from 'shared_clean/internal';
import { d_data, d_sections } from 'settings/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'load_settings') {
            return d_data.Settings.set_from_storage()
                .then(() => {
                    d_actions.Actions.initial_current_action = { ...data.current_action };

                    if (n(msg.restore_back_up) && msg.restore_back_up) {
                        d_sections.Restore.restore_back_up_react();
                    }

                    return true;
                })
                .catch((error_obj: any) => show_err_ribbon(error_obj, 'cot_1078'));
        }

        return false;
    }, 'cot_1013'),
);
