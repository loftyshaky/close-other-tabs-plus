const appRoot = require('app-root-path').path;

const { Manifest: ManifestShared } = require('@loftyshaky/shared/js/ext/manifest');

const manifest_shared = new ManifestShared({ app_root: appRoot });

class Manifest {
    generate = ({ test, browser }) => {
        const manifest = {
            manifest_version: 3,
            name: '__MSG_name__',
            description: '__MSG_description__',
            background: {
                service_worker: 'background.js',
            },
            options_ui: {
                page: 'settings.html',
                open_in_tab: true,
            },
            permissions: ['storage', 'contextMenus'],
            optional_permissions: ['tabs'],
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
                hotkey_4: {
                    description: '__MSG_hotkey_4__',
                },
                hotkey_5: {
                    description: '__MSG_hotkey_5__',
                },
                hotkey_6: {
                    description: '__MSG_hotkey_6__',
                },
                hotkey_7: {
                    description: '__MSG_hotkey_7__',
                },
                hotkey_8: {
                    description: '__MSG_hotkey_8__',
                },
                hotkey_9: {
                    description: '__MSG_hotkey_9__',
                },
                hotkey_10: {
                    description: '__MSG_hotkey_10__',
                },
                hotkey_11: {
                    description: '__MSG_hotkey_11__',
                },
                hotkey_12: {
                    description: '__MSG_hotkey_12__',
                },
                hotkey_13: {
                    description: '__MSG_hotkey_13__',
                },
                hotkey_14: {
                    description: '__MSG_hotkey_14__',
                },
                hotkey_15: {
                    description: '__MSG_hotkey_15__',
                },
                hotkey_16: {
                    description: '__MSG_hotkey_16__',
                },
                hotkey_17: {
                    description: '__MSG_hotkey_17__',
                },
                hotkey_18: {
                    description: '__MSG_hotkey_18__',
                },
                hotkey_19: {
                    description: '__MSG_hotkey_19__',
                },
                hotkey_20: {
                    description: '__MSG_hotkey_20__',
                },
                hotkey_21: {
                    description: '__MSG_hotkey_21__',
                },
                hotkey_22: {
                    description: '__MSG_hotkey_22__',
                },
                hotkey_23: {
                    description: '__MSG_hotkey_23__',
                },
                hotkey_24: {
                    description: '__MSG_hotkey_24__',
                },
                hotkey_25: {
                    description: '__MSG_hotkey_25__',
                },
                hotkey_26: {
                    description: '__MSG_hotkey_26__',
                },
                hotkey_27: {
                    description: '__MSG_hotkey_27__',
                },
                hotkey_28: {
                    description: '__MSG_hotkey_28__',
                },
                hotkey_29: {
                    description: '__MSG_hotkey_29__',
                },
                hotkey_30: {
                    description: '__MSG_hotkey_30__',
                },
                hotkey_31: {
                    description: '__MSG_hotkey_31__',
                },
                hotkey_32: {
                    description: '__MSG_hotkey_32__',
                },
                hotkey_33: {
                    description: '__MSG_hotkey_33__',
                },
                hotkey_34: {
                    description: '__MSG_hotkey_34__',
                },
                hotkey_35: {
                    description: '__MSG_hotkey_35__',
                },
                hotkey_36: {
                    description: '__MSG_hotkey_36__',
                },
                hotkey_37: {
                    description: '__MSG_hotkey_37__',
                },
                hotkey_38: {
                    description: '__MSG_hotkey_38__',
                },
                hotkey_39: {
                    description: '__MSG_hotkey_39__',
                },
                hotkey_40: {
                    description: '__MSG_hotkey_40__',
                },
                hotkey_41: {
                    description: '__MSG_hotkey_41__',
                },
                hotkey_42: {
                    description: '__MSG_hotkey_42__',
                },
                hotkey_43: {
                    description: '__MSG_hotkey_43__',
                },
                hotkey_44: {
                    description: '__MSG_hotkey_44__',
                },
                hotkey_45: {
                    description: '__MSG_hotkey_45__',
                },
                hotkey_46: {
                    description: '__MSG_hotkey_46__',
                },
                hotkey_47: {
                    description: '__MSG_hotkey_47__',
                },
                hotkey_48: {
                    description: '__MSG_hotkey_48__',
                },
                hotkey_49: {
                    description: '__MSG_hotkey_49__',
                },
                hotkey_50: {
                    description: '__MSG_hotkey_50__',
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
