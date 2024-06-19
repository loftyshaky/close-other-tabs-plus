import 'background/browser_action/scripts';
import 'background/context_menu/scripts';
import 'background/msgs/scripts';
import 'background/on_startup/scripts';

misplaced_dependency('background');

export * from 'background/init';

export * as s_actions from 'background/actions/scripts';
export * as s_badge from 'background/badge/scripts';
export * as s_context_menu from 'background/context_menu/scripts';
export * as s_data from 'background/data/scripts';
export * as s_tabs from 'background/tabs/scripts';

export * as i_tabs from 'background/tabs/interfaces';
