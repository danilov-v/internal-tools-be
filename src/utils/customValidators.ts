import { isValid } from 'date-fns';
import { CustomValidator } from 'ow/dist/source/predicates/predicate';
import { deserializeDate } from './date';

const isDateString: CustomValidator<string> = function (value) {
    const date = deserializeDate(value);

    if (!isValid(date)) {
        return {
            message: function (label) { return `${label} must be a date string (yyyy-MM-dd)`; },
            validator: false
        };
    }

    return {
        message: '',
        validator: true
    };
};

export {
    isDateString
};
