import { InitAll } from 'shared/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await InitAll.init();

        InitAll.render_dependencies();
    }, 'cot_1008');
