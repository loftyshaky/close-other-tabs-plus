// eslint-disable-next-line spaced-comment
/// <reference types="../@loftyshaky/shared/globals.d.ts" />

import 'settings/msgs/scripts';

misplaced_dependency('settings');

export * from 'settings/init';

export * as c_settings from 'settings/components';

export * as d_optional_permissions from 'settings/optional_permissions/data';
export * as d_sections from 'settings/sections/data';

export * as p_settings from 'settings/components/prop_types';
