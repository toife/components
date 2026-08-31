import { AvatarAttrOptions } from './avatar.type';
export declare const getAvatarAttrs: (options: AvatarAttrOptions) => {
    class: (string | {
        divider: boolean;
    })[];
    style: {
        [x: string]: string | undefined;
        backgroundImage: string | undefined;
    };
};
