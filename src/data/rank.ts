import BaseModel from './base.model';

class Rank extends BaseModel {
    name!: string;
    value!: number;

    static tableName = 'ranks';
}

export default Rank;
