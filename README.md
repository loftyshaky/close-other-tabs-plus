# Close Other Tabs+

A browser extension that enables you to close/pin/unpin/group/ungroup multiple tabs at once, filtering them by a window, pin/group state, or URL.

## Links

[README.md на русском](https://github.com/loftyshaky/close-other-tabs-plus/blob/main/README-RU.md)<br>
[Chrome Web Store](https://chromewebstore.google.com/detail/higiahnfphokonkjalljdfgjhafdjbil)<br>
[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/higiahnfphokonkjalljdfgjhafdjbil)

## Filtering by Workspaces in Opera

In addition to tab groups, Opera also offers workspaces. **Close Other Tabs+** for Opera supports filtering by workspaces alongside tab groups — you can choose to affect tabs in the current workspace, all workspaces, or other workspaces. To configure this, look for the **Which workspaces to affect** setting in the extension options.

## Affect tabs by group state in Yandex Browser

In Yandex Browser, every tab belongs to a group — even if it's just the main (default) group. As a result, the **Ungrouped** option in the **Affect tabs by group state** setting will not work as expected, since no tab is truly ungrouped.

## Build steps

1. `git clone https://github.com/loftyshaky/close-other-tabs-plus`
2. `cd` into the cloned repository
3. `npm install`
4. `npm run prod_test` (Chrome) / `npm run prod_test_edge` (Edge) / `npm run prod_test_opera` (Opera) / `npm run prod_test_yandex` (Yandex Browser) / `npm run prod_test_firefox` (Firefox)
