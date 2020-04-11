import Personnel from '../data/personnel';
import { plainToClass } from 'class-transformer';
import User from '../data/user';
import { Model } from 'objection';
import { CreatePersonnelDto, PersonnelDetailsDto, PersonnelRemovalDto, UpdatePersonnelDto } from '../routes/dtos';
import PersonnelRemoval from '../data/personnelRemoval';
import PersonnelRemovalType from '../data/personnelRemovalType';
import unitService from './unit.service';

const personnelService = {

    async createPersonnel(dto: CreatePersonnelDto): Promise<PersonnelDetailsDto> {
        const userDto = plainToClass(User, dto, { groups: [ User.GROUP_NAME ] });
        const personnelDto = plainToClass(Personnel, dto, { groups: [ Personnel.GROUP_NAME ] });
        return await Model.transaction(async trx => {
            const user = await User.query(trx).insert(userDto);
            personnelDto.userId = user.id;
            const personnel = await Personnel.query(trx).insert(personnelDto);
            return new PersonnelDetailsDto(user, personnel);
        });
    },

    async getPersonnelById(personnelId: number): Promise<PersonnelDetailsDto> {
        const personnel = await Personnel.query()
            .withGraphJoined('user')
            .findById(personnelId);
        return personnel ? new PersonnelDetailsDto(personnel.user, personnel) : null;
    },

    async getPersonnelByUnitId(unitId: number): Promise<Personnel[]> {
        const childUnitIds = await unitService.getChildUnitIds(unitId);
        return Personnel.query()
            .withGraphJoined('user')
            .withGraphJoined('unit')
            .whereNull('deleted_at')
            .whereIn('unit_id', childUnitIds);
    },

    async updatePersonnel(dto: UpdatePersonnelDto): Promise<void> {
        const userDto = plainToClass(User, dto, { groups: [ User.GROUP_NAME ] });
        const personnelDto = plainToClass(Personnel, dto, { groups: [ Personnel.GROUP_NAME ] });
        personnelDto.id = dto.personnelId;
        const personnel = await Personnel.query().findById(personnelDto.id);
        userDto.id = personnel.userId;
        await Model.transaction(async trx => {
            await Personnel.query(trx).update(personnelDto).where({ id: personnelDto.id });
            await User.query(trx).update(userDto).where({ id: userDto.id });
        });
    },

    async removePersonnel(dto: PersonnelRemovalDto): Promise<void> {
        const personnel = await Personnel.query().findById(dto.personnelId);
        if (personnel.deletedAt === null) {
            await Model.transaction(async trx => {
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
