import '@loftyshaky/shared/ext';
import { init_shared } from '@loftyshaky/shared/shared';
import { d_data, init } from 'settings/internal';

void (async () => {
    await d_data.Settings.set_from_storage();
    show_unable_to_access_settings_error();

    init_shared();
    await init();
})();
