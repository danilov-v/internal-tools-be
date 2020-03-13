import BaseModel from './base.model';
import Role from './role';
import User from './user';
import { Model, RelationMappings } from 'objection';

class Auth extends BaseModel {
    login!: string;
    password!: string;

    role!: Role;
    user!: User;

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
    }

    static tableName = 'auth';
}

export default Auth;
