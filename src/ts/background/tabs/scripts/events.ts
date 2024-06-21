import { s_tab_counter } from 'background/internal';

we.tabs.onCreated.addListener(() => {
    err(() => {
        s_tab_counter.Badge.i().set_tab_count();
    }, 'cot_1091');
});

we.tabs.onRemoved.addListener(() => {
    err(() => {
        s_tab_counter.Badge.i().set_tab_count();
    }, 'cot_1092');
});

we.windows.onRemoved.addListener(() => {
    err(() => {
        s_tab_counter.Badge.i().set_tab_count();
    }, 'cot_1093');
});

we.windows.onFocusChanged.addListener(() => {
    err(() => {
        s_tab_counter.Badge.i().set_tab_count();
    }, 'cot_1094');
});
