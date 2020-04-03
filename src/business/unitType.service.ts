import UnitType from '../data/unitType';

const unitTypeService = {
    async getAll(): Promise<UnitType[]> {
        return UnitType.query();
    }
};

export default unitTypeService;
