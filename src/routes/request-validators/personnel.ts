import ow from 'ow';
import { isDateString } from '../../utils/validators';

function validateCreatePersonnelRequest(req) {
    const body = req.body;

    ow(body.firstName, 'firstName', ow.string.nonEmpty);
    ow(body.lastName, 'lastName', ow.string.nonEmpty);
    ow(body.middleName, 'middleName', ow.any(ow.nullOrUndefined, ow.string.nonEmpty));
    ow(body.phone, 'phone', ow.string.matches(/^\+\d{3,12}$/));
    ow(body.position, 'position', ow.string.nonEmpty);
    ow(body.unitId, 'unitId', ow.number.integer);
    ow(body.rankId, 'rankId', ow.number.integer);
    ow(body.calledAt, 'calledAt', ow.string.validate(isDateString));
    ow(body.birthday, 'birthday', ow.string.validate(isDateString));
    ow(body.demobilizationAt, 'demobilizationAt', ow.any(ow.nullOrUndefined, ow.string.validate(isDateString)));
}

function validateGetPersonnelRequest(req) {
    const unitId = req.query.unitId;

    ow(unitId, 'unitId', ow.number.integer);
}

function validateGetPersonnelByIdRequest(req) {
    const personnelId = req.params.personnelId;

    ow(personnelId, 'personnelId', ow.number.integer);
}

const validatePersonnelRemovalRequest = ({ body }) => {
    ow(body.personnelId, 'personnelId', ow.number.integer);
    ow(body.typeId, 'typeId', ow.number.integer);
    ow(body.comment, 'comment', ow.any(ow.nullOrUndefined, ow.string.nonEmpty));
};

const validateUpdatePersonnelRequest = (req) => {
    validateCreatePersonnelRequest(req);
    validateGetPersonnelByIdRequest(req);
};

export {
    validateCreatePersonnelRequest,
    validateGetPersonnelRequest,
    validatePersonnelRemovalRequest,
    validateGetPersonnelByIdRequest,
    validateUpdatePersonnelRequest
};
