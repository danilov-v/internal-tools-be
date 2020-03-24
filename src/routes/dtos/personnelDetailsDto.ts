import User from '../../data/user';
import Personnel from '../../data/personnel';
import { serializeDate } from '../../utils/date';

export class PersonnelDetailsDto {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string | null;
    calledAt: string;
    demobilizationAt: string | null;
    phone: string;
    comment: string | null;
    birthday: string;
    position: string;
    unitId: number;
    rankId: number;

    constructor(user: User, personnel: Personnel) {
        this.id = personnel.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.middleName = user.middleName !== undefined ? user.middleName : null;
        this.calledAt = serializeDate(personnel.calledAt);
        this.demobilizationAt = personnel.demobilizationAt ? serializeDate(personnel.demobilizationAt) : null;
        this.phone = user.phone;
        this.comment = personnel.comment !== undefined ? personnel.comment : null;
        this.birthday = serializeDate(user.birthday);
        this.position = user.position;
        this.unitId = personnel.unitId;
        this.rankId = user.rankId;
    }
}
