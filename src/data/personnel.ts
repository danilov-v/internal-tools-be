import BaseModel from './base.model';
import User from './user';
import Unit from './unit';
import { Model, RelationMappings } from 'objection';
import PersonnelRemoval from './personnelRemoval';

class Personnel extends BaseModel {
    calledAt!: Date;
    demobilizationAt?: Date;
    comment?: string;
    unitId!: number;
    userId!: number;
    deletedAt?: Date;

    unit?: Unit;
    user?: User;
    personnelRemoval?: PersonnelRemoval;

    static tableName = 'personnel';

    static relationMappings = (): RelationMappings => ({
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
        },
        personnelRemoval: {
            relation: Model.BelongsToOneRelation,
            modelClass: PersonnelRemoval,
            join: {
                from: `${PersonnelRemoval.tableName}.personnel_id`,
                to: `${Personnel.tableName}.id`
            }
        }
    });
}

export default Personnel;
