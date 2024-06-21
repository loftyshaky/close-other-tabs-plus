export class Utils {
    private static i0: Utils;

    public static i(): Utils {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public is_textarea_input = ({ input_name }: { input_name: string }): boolean =>
        err(
            () => ['url_whitelist', 'url_blacklist', 'urls_after_action'].includes(input_name),
            'cot_1084',
        );
}
