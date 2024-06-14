import 'background/browser_action/scripts';
import 'background/msgs/scripts';
import 'background/on_startup/scripts';

misplaced_dependency('background');

export * from 'background/init';

export * as s_badge from 'background/badge/scripts';
export * as s_data from 'background/data/scripts';
