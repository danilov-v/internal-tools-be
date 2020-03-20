import BaseModel from './base.model';

class User extends BaseModel {
    createdAt!: Date;
    updatedAt?: Date | null;
    createdBy!: number;
    updatedBy?: number | null;

    firstName!: string;
    middleName?: string | null;
    lastName!: string;
    birthday!: Date;
    phone!: string;
    position?: string | null;

    rankId!: number;

    static tableName = 'users';

    $beforeInsert() {
        this.createdAt = new Date();
    }
}

export default User;
