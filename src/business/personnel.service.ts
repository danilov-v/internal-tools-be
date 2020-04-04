import UpdatePersonnelDto from '../routes/dtos/updatePersonnelDto';
import Personnel from '../data/personnel';
import { plainToClass } from 'class-transformer';
import User from '../data/user';
import { Model } from 'objection';

const personnelService = {

    async updatePersonnel(dto: UpdatePersonnelDto): Promise<void> {
        const userDto = plainToClass(User, dto, { groups: [ User.GROUP_NAME ] });
        const personnelDto = plainToClass(Personnel, dto, { groups: [ Personnel.GROUP_NAME ] });
        personnelDto.id = dto.personnelId;
        const personnel = await Personnel.query().findById(personnelDto.id);
        userDto.id = personnel.userId;
        await Model.transaction(async (trx) => {
            await Personnel.query(trx).update(personnelDto).where({ id: personnelDto.id });
            await User.query(trx).update(userDto).where({ id: userDto.id });
        });
    }
};

export default personnelService;
