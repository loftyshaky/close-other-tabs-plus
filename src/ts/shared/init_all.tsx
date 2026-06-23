import ReactDOM from 'react-dom/client';

import '@loftyshaky/shared/ext';
import { d_inputs } from '@loftyshaky/shared/inputs';
import {
    c_crash_handler,
    c_error,
    c_loading_screen,
    d_loading_screen,
    s_tab_index,
    s_theme,
} from '@loftyshaky/shared/shared';
import { s_css_vars, s_suffix } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    private announcement_root: HTMLDivElement | undefined = undefined;
    private settings_root: HTMLDivElement | undefined = undefined;
    private dependencies_root: HTMLDivElement | undefined = undefined;

    public init = (): Promise<void> =>
        new Promise((reslove) => {
            void err_async(async () => {
                const on_loading_screen_render = (): void =>
                    err(() => {
                        const loading_screen_root_el = s<HTMLDivElement>(
                            `.${new s_suffix.Suffix('loading_screen').result}`,
                        );

                        if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                            const loading_screen_css = x.css(
                                'loading_screen',
                                loading_screen_root_el.shadowRoot,
                            );

                            if (n(loading_screen_css)) {
                                x.bind(loading_screen_css, 'load', (): void =>
                                    err(() => {
                                        if (page === 'dependencies') {
                                            void s_theme.Theme.set({
                                                name: data.settings.prefs.options_page_theme,
                                            });
                                        }

                                        void d_loading_screen.Visibility.show();

                                        reslove();
                                    }, 'cot_1023'),
                                );
                            }
                        }
                    }, 'cot_1024');

                this.set_page_title();

                s_css_vars.CssVars.set();

                const error_root: ShadowRoot = this.create_root({ prefix: 'error' }) as ShadowRoot;
                const loading_screen_root: ShadowRoot = this.create_root({
                    prefix: 'loading_screen',
                }) as ShadowRoot;

                if (page === 'announcement') {
                    this.announcement_root = this.create_root({
                        prefix: 'announcement',
                        shadow_root: false,
                    }) as HTMLDivElement;
                } else if (page === 'settings') {
                    this.settings_root = this.create_root({
                        prefix: 'settings',
                        shadow_root: false,
                    }) as HTMLDivElement;
                } else if (page === 'dependencies') {
                    this.dependencies_root = this.create_root({
                        prefix: 'dependencies',
                        shadow_root: false,
                    }) as HTMLDivElement;
                }

                ReactDOM.createRoot(error_root).render(
                    <c_error.Body
                        app_id={s_suffix.app_id}
                        on_render={(): void =>
                            err(() => {
                                ReactDOM.createRoot(loading_screen_root).render(
                                    <c_crash_handler.Body>
                                        <c_loading_screen.Body
                                            app_id={s_suffix.app_id}
                                            on_render={(): void => {
                                                on_loading_screen_render();
                                            }}
                                        />
                                    </c_crash_handler.Body>,
                                );
                            }, 'cot_1025')
                        }
                    />,
                );
            }, 'cot_1026');
        });

    private create_root = ({
        prefix,
        shadow_root = true,
    }: {
        prefix: string;
        shadow_root?: boolean;
    }): HTMLDivElement | ShadowRoot | undefined =>
        err(() => {
            const root = x.create(
                'div',
                x.cls([new s_suffix.Suffix('root').result, new s_suffix.Suffix(prefix).result]),
            );

            x.append(document.body, root);

            if (shadow_root) {
                return root.attachShadow({ mode: 'open' });
            }

            return root;
        }, 'cot_1027');

    private set_page_title = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                title_el.textContent = ext.msg(`${page}_title_text`);
            }
        }, 'cot_1028');

    public render_announcement = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('announcement/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    await d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });
                }, 'cot_1150');

            if (n(this.announcement_root)) {
                ReactDOM.createRoot(this.announcement_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const announcement_css = x.css(
                                        'announcement_css',
                                        document.head,
                                    );

                                    void s_theme.Theme.set({
                                        name: data.settings.prefs.options_page_theme,
                                    });

                                    if (n(announcement_css)) {
                                        x.bind(announcement_css, 'load', on_css_load);
                                    }
                                }, 'cot_1149')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'cot_1148');

    public render_settings = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('settings/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    const { d_sections } = await import('settings/internal');

                    d_sections.Options.update_action_options();

                    await d_inputs.InputWidth.calculate();

                    void d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });

                    s_tab_index.TabIndex.bind_set_input_type_f();
                }, 'cot_1029');

            if (n(this.settings_root)) {
                ReactDOM.createRoot(this.settings_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const settings_css = x.css('settings_css', document.head);

                                    void s_theme.Theme.set({
                                        name: data.settings.prefs.options_page_theme,
                                    });

                                    if (n(settings_css)) {
                                        x.bind(settings_css, 'load', on_css_load);
                                    }
                                }, 'cot_1030')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'cot_1031');

    public render_dependencies = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('dependencies/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    void d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });
                }, 'cot_1032');

            if (n(this.dependencies_root)) {
                ReactDOM.createRoot(this.dependencies_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const dependencies_css = x.css(
                                        'dependencies_css',
                                        document.head,
                                    );

                                    void s_theme.Theme.set({
                                        name: data.settings.prefs.options_page_theme,
                                        additional_theme_callback: s_theme.Theme.set,
                                    });

                                    if (n(dependencies_css)) {
                                        x.bind(dependencies_css, 'load', on_css_load);
                                    }
                                }, 'cot_1033')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'cot_1034');
}

export const InitAll = Class.get_instance();
