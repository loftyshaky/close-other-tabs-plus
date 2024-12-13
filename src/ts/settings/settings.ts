import '@loftyshaky/shared/ext';
import { init_shared } from '@loftyshaky/shared/shared';
import { init, d_data } from 'settings/internal';

(async () => {
    await d_data.Settings.set_from_storage();
    await show_unable_to_access_settings_error();

    init_shared();
    await init();
})();
