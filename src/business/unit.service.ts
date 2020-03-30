import Unit from '../data/unit';
import logger from '../common/logger';
import { CreateUnitDto } from '../routes/dtos';

const unitService = {

    async createOrGetExistingUnit(unitDto: CreateUnitDto): Promise<Unit> {
        try {
            if (!unitDto.parentUnit) {
                unitDto.parentUnit = await this.getRootUnitId();
            }
            return await Unit.query()
                .insert(unitDto)
                .catch(async e => {
                    logger.error(e);
                    return (await Unit.query()
                        .where('name', unitDto.name)
                        .where('parent_unit', unitDto.parentUnit)
                        .where('type_id', unitDto.typeId))[0] || {} as Unit;
                });
        } catch (e) {
            logger.error(e);
            return {} as Unit;
        }
    },

    async findAllUnits(): Promise<Unit[]> {
        try {
            return await Unit.query().where({});
        } catch (e) {
            logger.error(e);
            return [];
        }
    },

    async getRootUnitId(): Promise<number> {
        const unit = await Unit.query().findOne('name', 'like', 'рота%');
        return unit.id;
    }
};

export default unitService;
