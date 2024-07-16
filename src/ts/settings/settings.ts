import { init_shared } from '@loftyshaky/shared';
import { init } from 'settings/internal';

(async () => {
    await show_unable_to_access_settings_error({});

    init_shared();
    await init();
})();
