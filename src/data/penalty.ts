import BaseModel from './base.model';
import { Model, RelationMappings } from 'objection';
import Auth from './auth';
import Personnel from './personnel';
import PenaltyType from './penaltyType';

class Penalty extends BaseModel {

    typeId!: number;
    personnelId!: number;
    comment?: string;
    createdAt!: Date;
    createdBy!: number;
    closedAt?: Date;
    closedBy?: number;

    type!: PenaltyType;
    personnel!: Personnel;

    $beforeInsert() {
        this.createdAt = new Date();
    }

    static tableName = 'penalties';

    static relationMappings: RelationMappings = {
        createdBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: Auth,
            join: {
                from: `${Penalty.tableName}.created_by`,
                to: `${Auth.tableName}.id`
            }
        },
        closedBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: Auth,
            join: {
                from: `${Penalty.tableName}.closed_by`,
                to: `${Auth.tableName}.id`
            }
        },
        type: {
            relation: Model.BelongsToOneRelation,
            modelClass: PenaltyType,
            join: {
                from: `${Penalty.tableName}.type_id`,
                to: `${PenaltyType.tableName}.id`
            }
        },
        personnel: {
            relation: Model.BelongsToOneRelation,
            modelClass: Personnel,
            join: {
                from: `${Penalty.tableName}.personnel_id`,
                to: `${Personnel.tableName}.id`
            }
        }
    };
}

export default Penalty;
