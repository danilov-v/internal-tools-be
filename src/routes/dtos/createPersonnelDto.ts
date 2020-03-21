import ow from 'ow';
import { deserializeDate } from '../../utils/date';
import { isDateString } from '../../utils/customValidators';

export class CreatePersonnelDto {
    private constructor(public firstName: string,
                        public lastName: string,
                        public middleName: string | null,
                        public calledAt: Date,
                        public demobilizationAt: Date | null,
                        public phone: string,
                        public comment: string | null,
                        public birthday: Date,
                        public position: string,
                        public unitId: number,
                        public rankId: number) {
    }

    getUser(userId: number) {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            phone: this.phone,
            birthday: this.birthday,
            position: this.position,
            rankId: this.rankId,
            createdBy: userId
        };
    }

    getPersonnel(userId: number) {
        return {
            calledAt: this.calledAt,
            demobilizationAt: this.demobilizationAt,
            comment: this.comment,
            unitId: this.unitId,
            userId: userId
        };
    }

    static create(reqBody): CreatePersonnelDto {
        this.throwIfInvalid(reqBody);

        return new CreatePersonnelDto(
            reqBody.firstName,
            reqBody.lastName,
            reqBody.middleName ? reqBody.middleName : null,
            deserializeDate(reqBody.calledAt),
            reqBody.demobilizationAt ? deserializeDate(reqBody.demobilizationAt) : null,
            reqBody.phone,
            reqBody.comment,
            deserializeDate(reqBody.birthday),
            reqBody.position,
            Number(reqBody.unitId),
            Number(reqBody.rankId));
    }

    private static throwIfInvalid(reqBody) {
        ow(reqBody.firstName, 'firstName', ow.string.nonEmpty);
        ow(reqBody.lastName, 'lastName', ow.string.nonEmpty);
        ow(reqBody.middleName, 'middleName', ow.any(ow.nullOrUndefined, ow.string.nonEmpty));
        ow(reqBody.phone, 'phone', ow.string.matches(/\+[0-9]*'/));
        ow(reqBody.position, 'position', ow.string.nonEmpty);
        ow(reqBody.unitId, 'unitId', ow.number.integer);
        ow(reqBody.rankId, 'rankId', ow.number.integer);
        ow(reqBody.calledAt, 'calledAt', ow.string.validate(isDateString));
        ow(reqBody.birthday, 'birthday', ow.string.validate(isDateString));
        ow(reqBody.demobilizationAt, 'demobilizationAt', ow.any(ow.nullOrUndefined, ow.string.validate(isDateString)));
    }
}
