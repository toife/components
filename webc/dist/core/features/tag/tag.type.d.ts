export type TagVariant = "fill" | "outline" | "text";
export type TagSize = string;
export type TagProps = {
    role?: string;
    size?: TagSize;
    shape?: string;
    variant?: TagVariant;
};
export type TagAttrOptions = {
    role: string;
    shape: string;
    size: string;
    variant: TagVariant;
};
