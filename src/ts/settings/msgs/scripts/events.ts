import { t } from '@loftyshaky/shared/shared';
import { d_actions } from 'shared_clean/internal';
import { d_data } from 'settings/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'load_settings') {
            d_data.Data.set_from_storage()
                .then(() => {
                    d_actions.Actions.initial_current_action = { ...data.current_action };
                })
                .catch((error_obj: any) => show_err_ribbon(error_obj, 'cot_1078'));

            return Promise.resolve(true);
        }

        return false;
    }, 'cot_1013'),
);
