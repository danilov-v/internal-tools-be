import BaseModel from './base.model';
import Role from './role';
import User from './user';
import { Model, RelationMappings } from 'objection';

class Auth extends BaseModel {
    login!: string;
    password!: string;
    roleId!: number;
    userId!: number;
    createdBy!: number;
    createdAt!: Date;
    deletedBy?: number;
    deletedAt?: Date;

    role?: Role;
    user?: User;

    static tableName = 'auth';

    static relationMappings: RelationMappings = {
        role: {
            relation: Model.HasOneRelation,
            modelClass: Role,
            join: {
                from: `${Auth.tableName}.role_id`,
                to: `${Role.tableName}.id`
            }
        },
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: `${Auth.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        }
    };

    $beforeInsert() {
        this.createdAt = new Date();
    }

    static getByLogin(login: string): Promise<Auth | null> {
        return Auth.query()
            .withGraphJoined('role')
            .withGraphJoined('user')
            .where('login', login)
            .then(entities => {
                if (entities.length > 1) {
                    throw new Error('expected a single record');
                }

                if (entities.length === 0) {
                    return null;
                }

                return entities[0];
            });
    }
}

export default Auth;
