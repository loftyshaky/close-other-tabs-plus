import { t } from '@loftyshaky/shared/shared_clean';
import { s_data } from 'background/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'reload_ext') {
            we.runtime.reload();
        } else if (msg_str === 'update_settings') {
            if (n(msg.update_instantly) && msg.update_instantly) {
                s_data.Manipulation.i().update_settings({
                    settings: msg.settings,
                    load_settings: n(msg.load_settings) ? msg.load_settings : false,
                    transform: n(msg.transform) ? msg.transform : false,
                    replace: n(msg.replace) ? msg.replace : false,
                });
            } else {
                s_data.Manipulation.i().update_settings_debounce(
                    msg.settings,
                    n(msg.transform) ? msg.transform : false,
                    n(msg.replace) ? msg.replace : false,
                );
            }

            return Promise.resolve(true);
        } else if (msg_str === 'create_test_actions') {
            s_data.Manipulation.i().update_settings({
                load_settings: true,
                replace: true,
                test_actions: true,
            });
        } else if (msg_str === 'get_defaults') {
            return Promise.resolve(s_data.Data.i().defaults);
        }

        return false;
    }, 'cot_1006'),
);
