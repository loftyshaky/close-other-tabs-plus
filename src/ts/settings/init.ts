import { d_sections, s_optional_permissions } from 'settings/internal';
import { InitAll } from 'shared/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await InitAll.init();

        await s_optional_permissions.Permissions.set_contains_permission_vals();
        d_sections.Options.init();
        d_sections.Sections.init();

        void InitAll.render_settings();
    }, 'cot_1011');
