import BaseModel from './base.model';

class PenaltyType extends BaseModel {
    name!: string;
    value!: number;

    static tableName = 'penalty_types';
}

export default PenaltyType;
