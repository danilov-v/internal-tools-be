import { validate } from 'validate.js';
import { deserializeDate } from '../../utils/date';

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

    static create(reqBody): { validationErrors; dto: CreatePersonnelDto} {
        const validationErrors = validate(reqBody, this.validationConstraints);
        if (validationErrors) {
            return { validationErrors, dto: null };
        }

        const dto = new CreatePersonnelDto(
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

        return { validationErrors: null, dto };
    }

    private static readonly validationConstraints = {
        firstName: {
            presence: { allowEmpty: false }
        },
        lastName: {
            presence: { allowEmpty: false }
        },
        middleName: {
            length: { minimum: 1 }
        },
        calledAt: {
            presence: true,
            customDate: {
                dateOnly: true
            }
        },
        demobilizationAt: {
            presence: true,
            customDate: {
                dateOnly: true
            }
        },
        phone: {
            presence: true,
            format: {
                // eslint-disable-next-line no-useless-escape
                pattern: '\\+[0-9]*'
            }
        },
        birthday: {
            presence: true,
            customDate: {
                dateOnly: true
            }
        },
        position: {
            presence: { allowEmpty: false }
        },
        unitId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                greaterThan: 0
            }
        },
        rankId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                greaterThan: 0
            }
        }
    };
}
