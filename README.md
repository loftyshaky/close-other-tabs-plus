# Close Other Tabs+

<a href="https://github.com/loftyshaky/close-other-tabs-plus/tags"><img src="https://img.shields.io/github/v/tag/loftyshaky/close-other-tabs-plus?label=Version&color=blue" alt="Version"></a> <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="License: MIT"></a> <img src="https://img.shields.io/github/downloads/loftyshaky/close-other-tabs-plus/total?label=Downloads%20&color=green" alt="GitHub all releases"> <img src="https://img.shields.io/github/downloads/loftyshaky/close-other-tabs-plus/latest/total?sort=date&label=Downloads@Latest&color=green" alt="GitHub Release">

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
4. `npm run prod_test` (Chrome) / `npm run prod_test_edge` (Edge) / `npm run prod_test_opera` (Opera) / `npm run prod_test_brave` (Brave) / `npm run prod_test_yandex` (Yandex Browser) / `npm run prod_test_firefox` (Firefox)
