import { t } from '@loftyshaky/shared';
import { s_data } from 'background/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'update_settings') {
            s_data.Main.i().update_settings_debounce(
                msg.settings,
                n(msg.rerun_actions) ? msg.rerun_actions : false,
                n(msg.transform) ? msg.transform : false,
                n(msg.replace) ? msg.replace : false,
            );

            return Promise.resolve(true);
        }

        if (msg_str === 'get_defaults') {
            return Promise.resolve(s_data.Main.i().defaults);
        }

        return false;
    }, 'cot_1006'),
);
