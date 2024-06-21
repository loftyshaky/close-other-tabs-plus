import { InitAll } from 'shared/internal';
import { d_sections } from 'settings/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await InitAll.i().init();
        d_sections.Options.i().init();
        d_sections.Sections.i().init();

        InitAll.i().render_settings();
    }, 'cot_1011');
