import { s_data as s_data_loftyshaky_shared_clean } from '@loftyshaky/shared/shared_clean';
import { s_data, s_tab_counter } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_data.Settings.init_defaults();
        s_data.Settings.init_test_actions();
        await s_data_loftyshaky_shared_clean.Cache.set_data();

        s_tab_counter.Badge.set_color();

        await s_data.Manipulation.on_init_set_from_storage();
    }, 'cot_1005');
