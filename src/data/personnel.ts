import BaseModel from './base.model';
import User from './user';
import Unit from './unit';
import { Model, RelationMappings } from 'objection';

class Personnel extends BaseModel {
    calledAt!: Date;
    demobilizationAt: Date;
    comment: string;

    unit!: Unit;
    user!: User;

    static relationMappings: RelationMappings = {
        unit: {
            relation: Model.HasOneRelation,
            modelClass: Unit,
            join: {
                from: 'personnel.unit_id',
                to: 'units.id'
            }
        },
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'personnel.user_id',
                to: 'users.id'
            }
        }
    };


    static getByUnitId(unitId: number): Promise<Personnel[]> {
        return Personnel.query()
            .withGraphJoined('user')
            .withGraphJoined('unit')
            .where('unit_id', unitId);
    }

    static tableName = 'personnel';
}

export default Personnel;
