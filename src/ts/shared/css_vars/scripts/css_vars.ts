import { s_css_vars } from '@loftyshaky/shared';

export class CssVars {
    private static i0: CssVars;

    public static i(): CssVars {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = (): void =>
        err(() => {
            const roots = [document.documentElement];

            s_css_vars.Main.i().set_transition_vars({
                roots,
                transition_duration: data.settings.transition_duration,
            });
        }, 'cot_1022');
}