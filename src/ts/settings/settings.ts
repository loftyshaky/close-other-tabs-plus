import { init_shared } from '@loftyshaky/shared';
import { d_data } from 'shared/internal';
import { init } from 'settings/internal';

(async () => {
    await d_data.Transform.i().set_transformed_from_storage();
    await show_unable_to_access_settings_error({});

    init_shared();
    await init();
})();
