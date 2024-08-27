import { t } from '@loftyshaky/shared/shared_clean';
import { s_data } from 'background/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'reload_ext') {
            we.runtime.reload();
        } else if (msg_str === 'update_settings') {
            if (n(msg.update_instantly) && msg.update_instantly) {
                s_data.Manipulation.update_settings({
                    settings: msg.settings,
                    replace: n(msg.replace) ? msg.replace : false,
                    update_context_menus: n(msg.update_context_menus)
                        ? msg.update_context_menus
                        : false,
                    transform: n(msg.transform) ? msg.transform : false,
                    transform_force: n(msg.transform_force) ? msg.transform_force : false,
                    load_settings: n(msg.load_settings) ? msg.load_settings : false,
                });
            } else {
                s_data.Manipulation.update_settings_debounce(
                    msg.settings,
                    n(msg.replace) ? msg.replace : false,
                    n(msg.update_context_menus) ? msg.update_context_menus : false,
                    n(msg.transform) ? msg.transform : false,
                    n(msg.transform_force) ? msg.transform_force : false,
                );
            }

            return Promise.resolve(true);
        } else if (msg_str === 'create_test_actions') {
            s_data.Manipulation.update_settings({
                replace: true,
                load_settings: true,
                test_actions: true,
                tabs_permission_granted: msg.tabs_permission_granted,
                update_context_menus: true,
            });
        } else if (msg_str === 'get_defaults') {
            return Promise.resolve(s_data.Settings.defaults);
        }

        return false;
    }, 'cot_1006'),
);
