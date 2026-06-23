import type { t } from '@loftyshaky/shared/shared_clean';
import { s_data } from '@loftyshaky/shared/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public apply_unchanged_prefs = ({ settings }: { settings: t.AnyRecord }): t.AnyRecord =>
        err(
            () =>
                s_data.Settings.apply_unchanged_prefs({
                    settings,
                }),
            'cnt_1530',
        );
}

export const Settings = Class.get_instance();
