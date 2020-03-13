import BaseModel from './base.model';

class User extends BaseModel {
    createdAt!: Date;
    updatedAt!: Date;
    createdBy!: string;
    updatedBy!: string;

    firstName!: string;
    middleName?: string;
    lastName!: string;
    birthday!: Date;
    phone!: string;
    position?: string;

    static tableName = 'users';
}

export default User;
