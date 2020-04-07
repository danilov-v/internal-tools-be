import ow from 'ow';
import { isDateString } from '../../utils/validators';

function validateCreatePersonnelRequest(req) {
    const body = req.body;

    ow(body.firstName, 'firstName', ow.string.nonEmpty);
    ow(body.lastName, 'lastName', ow.string.nonEmpty);
    ow(body.middleName, 'middleName', ow.any(ow.nullOrUndefined, ow.string.nonEmpty));
    ow(body.phone, 'phone', ow.string.matches(/^\+\d{3,12}$/));
    ow(body.position, 'position', ow.string.nonEmpty);
    ow(body.unitId, 'unitId', ow.any(ow.number.integer, ow.string.numeric));
    ow(body.rankId, 'rankId', ow.any(ow.number.integer, ow.string.numeric));
    ow(body.calledAt, 'calledAt', ow.string.validate(isDateString));
    ow(body.birthday, 'birthday', ow.string.validate(isDateString));
    ow(body.demobilizationAt, 'demobilizationAt', ow.any(ow.nullOrUndefined, ow.string.validate(isDateString)));
}

function validateGetPersonnelRequest(req) {
    const unitId = req.query.unitId;

    ow(unitId, 'unitId', ow.any(ow.number.integer, ow.string.numeric));
}

function validateGetPersonnelByIdRequest(req) {
    const personnelId = req.params.personnelId;

    ow(personnelId, 'personnelId', ow.any(ow.number.integer, ow.string.numeric));
}

const validateUpdatePersonnelRequest = (req) => {
    validateCreatePersonnelRequest(req);
    validateGetPersonnelByIdRequest(req);
};

export {
    validateCreatePersonnelRequest,
    validateGetPersonnelRequest,
    validateGetPersonnelByIdRequest,
    validateUpdatePersonnelRequest
};
