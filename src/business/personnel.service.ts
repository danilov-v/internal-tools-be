import { plainToClass } from 'class-transformer';
import PersonnelRemoval from '../data/personnelRemoval';
import PersonnelRemovalType from '../data/personnelRemovalType';
import { PersonnelRemovalDto } from '../routes/dtos';
import { Model } from 'objection';
import Personnel from '../data/personnel';

const personnelService = {

    async removePersonnel(dto: PersonnelRemovalDto): Promise<void> {
        const personnel = await Personnel.query().findById(dto.personnelId);
        if (personnel.deletedAt === null) {
            await Model.transaction(async (trx) => {
                await PersonnelRemoval.query(trx).insert(plainToClass(PersonnelRemoval, dto));
                await Personnel.query(trx).findById(dto.personnelId).update({ deletedAt: new Date() });
            });
        }
    },

    async getRemovalTypes(): Promise<PersonnelRemovalType[]> {
        return PersonnelRemovalType.query();
    }
};

export default personnelService;
