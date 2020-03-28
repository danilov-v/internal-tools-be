import Personnel from '../../data/personnel';
import { serializeDate } from '../../utils/date';

export class PersonnelInfoDto {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string | null;
    calledAt: string;
    demobilizationAt: string | null;
    unitId: number;

    constructor(personnel: Personnel) {
        this.id = personnel.id;
        this.firstName = personnel.user.firstName;
        this.lastName = personnel.user.lastName;
        this.middleName = personnel.user.middleName;
        this.calledAt = serializeDate(personnel.calledAt);
        this.demobilizationAt = personnel.demobilizationAt ? serializeDate(personnel.demobilizationAt) : null;
        this.unitId = personnel.unitId;
    }
}
