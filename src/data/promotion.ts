import BaseModel from './base.model';
import PromotionType from './promotionType';
import Personnel from './personnel';
import { Model, RelationMappings } from 'objection';

class Promotion extends BaseModel {
    typeId!: number;
    personnelId!: number;
    comment?: string;
    createdAt!: Date;
    createdBy!: number;
    closedAt?: Date;
    closedBy?: number;

    type!: PromotionType;
    personnel!: Personnel;

    static tableName = 'promotions';

    static relationMappings: RelationMappings = {
        personnel: {
            modelClass: Personnel,
            relation: Model.BelongsToOneRelation,
            join: {
                from: `${Promotion.tableName}.personnel_id`,
                to: `${Personnel.tableName}.id`
            }
        },
        type: {
            modelClass: PromotionType,
            relation: Model.BelongsToOneRelation,
            join: {
                from: `${Promotion.tableName}.type_id`,
                to: `${PromotionType.tableName}.id`
            }
        }
    };

    $beforeInsert() {
        this.createdAt = new Date();
    }
}

export default Promotion;
