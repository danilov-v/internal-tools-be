import { format, formatISO, parse, parseISO } from 'date-fns';

const zero = new Date(0, 0, 0, 0, 0, 0, 0);

export function serializeDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

export function deserializeDate(dateString: string) {
    return parse(dateString, 'yyyy-MM-dd', zero);
}

export function serializeDatetime(date: Date) {
    return formatISO(date);
}

export function deserializeDatetime(dateString: string) {
    return parseISO(dateString);
}
