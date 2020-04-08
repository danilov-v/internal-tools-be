import Unit from '../data/unit';
import logger from '../common/logger';
import { CreateUnitDto } from '../routes/dtos';

const extractIds = (units: Unit[]): number[] => units.flatMap(unit => [ unit.id, ...extractIds(unit.children) ]);

const unitService = {
    async createOrGetExistingUnit(unitDto: CreateUnitDto): Promise<Unit> {
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
    },

    async getChildUnitIds(unitId: number): Promise<number[]> {
        const units = await Unit.query()
            .withGraphFetched('children.^')
            .where('id', unitId);

        return extractIds(units);
    },

    async findAllUnits(): Promise<Unit[]> {
        return Unit.query();
    },

    async getRootUnitId(): Promise<number> {
        const unit = await Unit.query().findOne('name', 'like', 'рота%');
        return unit.id;
    }
};

export default unitService;
