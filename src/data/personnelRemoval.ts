import BaseModel from './base.model';
import Auth from './auth';
import Personnel from './personnel';
import { Model, RelationMappings } from 'objection';
import PersonnelRemovalType from './personnelRemovalType';

class PersonnelRemoval extends BaseModel {
    typeId!: number;
    personnelId!: number;
    createdAt!: Date;
    createdBy!: number;
    comment: string;

    type: PersonnelRemovalType;
    personnel!: Personnel;

    static tableName = 'personnel_removal';

    static relationMappings: RelationMappings = {
        personnel: {
            modelClass: Personnel,
            relation: Model.BelongsToOneRelation,
            join: {
                from: `${PersonnelRemoval.tableName}.personnel_id`,
                to: `${Personnel.tableName}.id`
            }
        },
        type: {
            modelClass: Auth,
            relation: Model.BelongsToOneRelation,
            join: {
                from: `${PersonnelRemoval.tableName}.type_id`,
                to: `${PersonnelRemovalType.tableName}.id`
            }
        }
    }

    $beforeInsert() {
        this.createdAt = new Date();
    }
}

export default PersonnelRemoval;
