import { Model } from 'objection';

abstract class BaseModel extends Model {
    id!: number;

    static idColumn = 'id';
}

export default BaseModel;
