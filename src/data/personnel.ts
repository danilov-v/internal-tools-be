import BaseModel from './base.model';
import User from './user';
import Unit from './unit';
import { Model, RelationMappings } from 'objection';

class Personnel extends BaseModel {
    calledAt!: Date;
    demobilizationAt?: Date;
    comment?: string;
    unitId!: number;
    userId!: number;

    unit?: Unit;
    user?: User;

    static tableName = 'personnel';

    static relationMappings: RelationMappings = {
        unit: {
            relation: Model.BelongsToOneRelation,
            modelClass: Unit,
            join: {
                from: `${Personnel.tableName}.unit_id`,
                to: `${Unit.tableName}.id`
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Personnel.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        }
    };
}

export default Personnel;
