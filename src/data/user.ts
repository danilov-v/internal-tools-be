import BaseModel from './base.model';

class User extends BaseModel {
    createdAt!: Date;
    updatedAt?: Date;
    createdBy!: number;
    updatedBy?: number;

    firstName!: string;
    middleName?: string;
    lastName!: string;
    birthday!: Date;
    phone!: string;
    position?: string;

    rankId!: number;

    static tableName = 'users';
}

export default User;
