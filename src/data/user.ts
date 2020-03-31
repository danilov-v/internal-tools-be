import BaseModel from './base.model';
import Rank from './rank';
import { Model, RelationMappings } from 'objection';

class User extends BaseModel {
    firstName!: string;
    middleName?: string;
    lastName!: string;
    birthday!: Date;
    phone!: string;
    position?: string;
    rankId!: number;
    createdAt!: Date;
    createdBy!: number;
    updatedAt?: Date;
    updatedBy?: number;

    rank!: Rank;

    static tableName = 'users';

    static relationMappings: RelationMappings = {
        rank: {
            modelClass: Rank,
            relation: Model.BelongsToOneRelation,
            join: {
                from: `${User.tableName}.rank_id`,
                to: `${Rank.tableName}.id`
            }
        }
    };

    $beforeInsert() {
        this.createdAt = new Date();
    }
}

export default User;
