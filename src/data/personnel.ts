import BaseModel from './base.model';
import User from './user';
import Unit from './unit';
import { Model, RelationMappings } from 'objection';
import PersonnelRemoval from './personnelRemoval';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
class Personnel extends BaseModel {
    public static readonly GROUP_NAME = 'personnel';

    @Expose({ groups: [ Personnel.GROUP_NAME ] })
    calledAt!: Date;

    @Expose({ groups: [ Personnel.GROUP_NAME ] })
    demobilizationAt?: Date;

    @Expose({ groups: [ Personnel.GROUP_NAME ] })
    comment?: string;

    @Expose({ groups: [ Personnel.GROUP_NAME ] })
    unitId!: number;

    @Expose({ groups: [ Personnel.GROUP_NAME ] })
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
