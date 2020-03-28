import { deserializeDate } from './date';

function dateTransformer(value): Date {
    return deserializeDate(value);
}

function optionalDateTransformer(value): Date | null {
    return value ? deserializeDate(value) : null;
}

export {
    dateTransformer,
    optionalDateTransformer
};
