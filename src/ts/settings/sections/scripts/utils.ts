class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public is_textarea_input = ({ input_name }: { input_name: string }): boolean =>
        err(
            () => ['url_whitelist', 'url_blacklist', 'urls_after_action'].includes(input_name),
            'cot_1084',
        );
}

export const Utils = Class.get_instance();
