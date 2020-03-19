import BaseModel from './base.model';

class Role extends BaseModel {
    name!: string;

    static tableName = 'roles';
}

export default Role;
