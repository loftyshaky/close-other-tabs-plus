import { t } from '@loftyshaky/shared';
import { d_actions, d_data } from 'shared/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'load_settings') {
            d_data.Transform.i()
                .set_transformed_from_storage()
                .then(() => d_actions.Actions.i().set())
                .then(() => {
                    d_actions.Actions.i().initial_current_action = { ...data.current_action };
                })
                .catch((error_obj: any) => show_err_ribbon(error_obj, 'cot_1078'));

            return Promise.resolve(true);
        }

        return false;
    }, 'cot_1013'),
);
