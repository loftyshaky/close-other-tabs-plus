const appRoot = require('app-root-path').path;

const { Manifest: ManifestShared } = require('@loftyshaky/shared/js/ext/manifest');

const manifest_shared = new ManifestShared({ app_root: appRoot });

class Manifest {
    generate = ({ test, browser }) => {
        const manifest = {
            manifest_version: 3,
            name: 'Close Other Tabs Extended',
            description: '__MSG_description__',
            background: {
                service_worker: 'background.js',
            },
            options_ui: {
                page: 'settings.html',
                open_in_tab: true,
            },
            permissions: ['storage', 'contextMenus', 'tabs'],
            commands: {
                hotkey_1: {
                    suggested_key: {
                        default: 'Ctrl+Shift+1',
                    },
                    description: '__MSG_hotkey_1__',
                },
                hotkey_2: {
                    suggested_key: {
                        default: 'Ctrl+Shift+3',
                    },
                    description: '__MSG_hotkey_2__',
                },
                hotkey_3: {
                    suggested_key: {
                        default: 'Ctrl+Shift+2',
                    },
                    description: '__MSG_hotkey_3__',
                },
            },
        };

        if (test) {
            manifest.key =
                'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCybiVyLGkRMlKd2siP4Ld24+SIjaWKZvwnGBzmJCb3/mGpz4QQHaQbHQXJ9BMdvOjQOZCl3eSpv/m9gDQwljENQ2bEtmORmh217TkAthnYnep4cQlaV0KmsAq373taFy2FoxyWwBBAtoom4b9OP2w2AP4a0sGNLvt9jK91enaLiGGlv+Bag2YFPjoxZqyPOrUj74voj+p26RvmvVuKjBbUdc+pjj3EYV4eaXZe4GnN9+OGuzXvb7eFiP5LUXBds/szRJC1ueqVjCj9/bxqul1hBEB3zgRTNVQV8w0+1Y21JuwlG6goV28B44L1B2dnvh4xKVxS+7uE3dgH4Yx6Ct7lAgMBAAECggEAR7c3u8UX0b6dMC8wb4vNka6VO0FbaN5tuLTbYLDlLMYEsQDkPqn7PJ6UphBA4rH8DT0l41TlREkR8tWlpGWpf4A4vRXlvS7phCa9w4htqQAHrrMYJERwWJjnJfjOZm5scIsXwYuevLPhoTEY+DVLpAUQHO3at4lLsbGrEBfRr9DKVkJZXaGkckukeqOONBDiqpcLMNV1e5o5CWWTLfK73vWv3IruS5K5s+22lwE3vhF9USl132h+LXmY26a2hiVEYMCZuHWGXZvrQiCxyr2ClHpzvc+/v1d5vOcrn5i66tHOpdt1QxRnNySbRvvya4mphBGW08mQ3d1SNtgHaFLAnQKBgQD4Z4TS6nnKX+gLsEwZG3Ww1ZpgLE0tRWtWj9HpcV1StVelaBuus/PShU/Nhyx1e1Yi5UdHn82Pnq99z5+N1mUh+tVWChUygGK9FsaNzWg2tgYQwFVr1/4vAtrKr2pErCET0H3gRcOcfs14j56oZhFwy7Hg0obQLWTsqXxgrzIdYwKBgQC34uDHe5LTTi23GQap9uIx5sXt4ItBvvWbFhwLEz7SuNU6YHFCE9lDu1DRWlLx4+yLM2GSbBEWyZa9sGdKz7vULR9E2GpAzctxbEZLoVxmsd0cjv9oaWsXJ1vvkxlaDB21qFKHH8x4PVO7E390a6zrdmfHLXSNqLgAriJ6ngNJFwKBgQCU+zE0dqC4+bBoYkIhxNBfUJ0YFTnsbvgjoHpbMjywgEai07/WleMkXgQw1mOZynEs2KpZkMRu4NOL91xQa0eYi6IryjxQX6PYmLJZFdrtBVq57UDOP2sZsvKaIX7w1PO5uI/mVLEvSPXe2vRjN2Q6bFCw8FMexDsFndkU+75o1QKBgQClvxpctEXjsNQD9crL6Hx5/kjp4TukRzuaTpN4aCB4T6HivItZxApRwsVV7tRUs9zCm82W7VF5+LqmwBpalGP5G7LTmz4qq1R1J+M0yH1BE5D57OrKcjrU4+U6TJzNTZ553v6ETWU//Ac82JZJmcSDeHaSUaZ9CVbRRiRN4Z+UgQKBgQCjDqF5ORixbfQ2cq/PlqSEF11Lw4DpEz8QlrpeVpw1cWcU1dT/XEJ9rORbf9SevX2Tuotkxvq7KNvu4YHTgy/T5+Nleg6TQmiE+WhCjyTmDvnDNGaFcQd/VQ4mpmHjIMnd2/HG6BW5+hMx/QE5Oo/du6gVgaKHYs61a0w3PBJgFw==';
        }

        manifest_shared.generate({
            manifest,
            browser,
        });
    };
}

module.exports = { Manifest };
