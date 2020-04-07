import BaseModel from './base.model';
import Rank from './rank';
import { Model, RelationMappings } from 'objection';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
class User extends BaseModel {
    public static readonly GROUP_NAME = 'user';

    @Expose({ groups: [ User.GROUP_NAME ] })
    firstName!: string;

    @Expose({ groups: [ User.GROUP_NAME ] })
    middleName?: string;

    @Expose({ groups: [ User.GROUP_NAME ] })
    lastName!: string;

    @Expose({ groups: [ User.GROUP_NAME ] })
    birthday!: Date;

    @Expose({ groups: [ User.GROUP_NAME ] })
    phone!: string;

    @Expose({ groups: [ User.GROUP_NAME ] })
    position?: string;

    @Expose({ groups: [ User.GROUP_NAME ] })
    rankId!: number;

    @Expose({ groups: [ User.GROUP_NAME ] })
    createdAt!: Date;

    @Expose({ groups: [ User.GROUP_NAME ] })
    createdBy!: number;

    @Expose({ groups: [ User.GROUP_NAME ] })
    updatedAt?: Date;

    @Expose({ groups: [ User.GROUP_NAME ] })
    updatedBy?: number;

    rank?: Rank;

    static tableName = 'users';

    static relationMappings = (): RelationMappings => ({
        rank: {
            modelClass: Rank,
            relation: Model.BelongsToOneRelation,
            join: {
                from: `${User.tableName}.rank_id`,
                to: `${Rank.tableName}.id`
            }
        }
    });

    $beforeInsert() {
        this.createdAt = new Date();
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }
}

export default User;
