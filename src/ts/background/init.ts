import { s_data, s_tab_counter } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_data.Data.i().init_defaults();
        s_data.Data.i().init_test_actions();
        s_tab_counter.Badge.i().set_color();

        await s_data.Manipulation.i().on_init_set_from_storage();
    }, 'cot_1005');
