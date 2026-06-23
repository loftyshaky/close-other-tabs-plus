import type { i_error, t } from '@loftyshaky/shared/shared_clean';
import { d_data, d_sections } from 'settings/internal';
import { d_actions } from 'shared_clean/internal';

we.runtime.onMessage.addListener(
    (msg: t.Any): t.Any =>
        err(() => {
            const msg_str: string = msg.msg;

            if (msg_str === 'load_settings') {
                return d_data.Settings.set_from_storage()
                    .then(() => {
                        d_actions.Actions.initial_current_action = { ...data.current_action };

                        if (n(msg.restore_back_up) && msg.restore_back_up) {
                            void d_sections.Restore.restore_back_up_react();
                        }

                        return true;
                    })
                    .catch((error_obj: i_error.ErrorObj) => show_err_ribbon(error_obj, 'cot_1078'));
            } else if (msg_str === 'get_is_internal_storage_write_val') {
                return Promise.resolve(d_data.Manipulation.is_internal_storage_write);
            }

            return false;
        }, 'cot_1013'),
);
