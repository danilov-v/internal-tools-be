import BaseModel from './base.model';

class UnitType extends BaseModel {
    name!: string;

    static tableName = 'unit_types';
}

export default UnitType;
