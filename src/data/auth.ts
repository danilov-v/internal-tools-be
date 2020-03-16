import BaseModel from './base.model';
import Role from './role';
import User from './user';
import { Model, RelationMappings } from 'objection';

class Auth extends BaseModel {
    login!: string;
    password!: string;

    role!: Role;
    user!: User;

    static getByLogin(username: string): Promise<Auth | null> {
        return Auth.query()
            .withGraphFetched('role')
            .where('login', username)
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

    static relationMappings: RelationMappings = {
        role: {
            relation: Model.HasOneRelation,
            modelClass: Role,
            join: {
                from: 'auth.role_id',
                to: 'roles.id'
            }
        },
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'auth.user_id',
                to: 'users.id'
            }
        }
    };

    static tableName = 'auth';
}

export default Auth;
