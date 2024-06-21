import _ from 'lodash';
import { makeObservable, action } from 'mobx';

import { s_sections } from 'settings/internal';

export class Textarea {
    private static i0: Textarea;

    public static i(): Textarea {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            transfrom_textarea_input_into_arrays: action,
        });
    }

    public transfrom_textarea_input_into_arrays = (): void =>
        err(() => {
            const current_action_updates: any = {};

            Object.entries(data.current_action).forEach(([key, val]: any) => {
                if (s_sections.Utils.i().is_textarea_input({ input_name: key })) {
                    const arr_val: string[] = n(val.split) ? val.split(',') : val;

                    current_action_updates[key] =
                        val.length === 0 ? [] : _.reject(_.map(arr_val, _.trim), _.isEmpty);
                }
            });

            data.current_action = { ...data.current_action, ...current_action_updates };
        }, 'cot_1085');
}
