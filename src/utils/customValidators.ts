import { isValid, parse, parseISO } from 'date-fns';

export function customDate (value, options) {
    const date = options.dateOnly
        ? parse(value, 'yyyy-MM-dd', new Date(0, 0, 0, 0, 0, 0, 0))
        : parseISO(value);

    if (!isValid(date)) {
        return 'must be a valid date';
    }

    return null;
}
