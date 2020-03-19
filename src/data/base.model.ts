import { Model, snakeCaseMappers } from 'objection';

abstract class BaseModel extends Model {
    id!: number;

    static idColumn = 'id';

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

export default BaseModel;
