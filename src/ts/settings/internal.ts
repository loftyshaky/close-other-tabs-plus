// eslint-disable-next-line spaced-comment
/// <reference types="../@loftyshaky/shared/globals.d.ts" />

import 'settings/msgs/scripts';

misplaced_dependency('settings');

export * from 'settings/init';

export * as c_settings from 'settings/components';

export * as d_actions from 'settings/actions/data';
export * as d_data from 'settings/data/data';
export * as d_sections from 'settings/sections/data';

export * as s_optional_permissions from 'settings/optional_permissions/scripts';
export * as s_sections from 'settings/sections/scripts';

export * as p_settings from 'settings/components/prop_types';
