import BaseModel from './base.model';

class PromotionType extends BaseModel {
    name!: string;
    value!: number;

    static tableName = 'promotion_types';
}

export default PromotionType;
