import { s_data as s_data_shared } from 'shared/internal';
import { s_data } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_data.Main.i().init_defaults();
        await s_data_shared.Main.i().create_objs_background();
        await s_data.Main.i().set_from_storage({ transform: true });
    }, 'cot_1005');
