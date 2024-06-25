import 'background/browser_action/scripts';
import 'background/context_menu/scripts';
import 'background/hotkeys/scripts';
import 'background/msgs/scripts';
import 'background/on_startup/scripts';
import 'background/tabs/scripts';

misplaced_dependency('background');

export * from 'background/init';

export * as s_actions from 'background/actions/scripts';
export * as s_tab_counter from 'background/tab_counter/scripts';
export * as s_context_menu from 'background/context_menu/scripts';
export * as s_data from 'background/data/scripts';

export * as i_tabs from 'background/tabs/interfaces';
