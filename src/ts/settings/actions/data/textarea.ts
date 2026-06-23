import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import reject from 'lodash/reject';
import trim from 'lodash/trim';
import { action, makeObservable } from 'mobx';

import type { t } from '@loftyshaky/shared/shared_clean';
import { s_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            transfrom_textarea_input_into_arrays: action,
        });
    }

    public transfrom_textarea_input_into_arrays = (): void =>
        err(() => {
            const current_action_updates: t.AnyRecord = {};

            Object.entries(data.current_action).forEach(([key, val]: t.Any) => {
                if (s_sections.Utils.is_textarea_input({ input_name: key })) {
                    const arr_val: string[] = n(val.split) ? val.split(',') : val;

                    current_action_updates[key] =
                        val.length === 0 ? [] : reject(map(arr_val, trim), isEmpty);
                }
            });

            data.current_action = { ...data.current_action, ...current_action_updates };
        }, 'cot_1085');
}

export const Textarea = Class.get_instance();
