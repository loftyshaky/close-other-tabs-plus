import { InitAll } from 'shared/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await InitAll.init();

        await InitAll.render_announcement();
    }, 'cot_1000');
