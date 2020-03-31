import BaseModel from './base.model';

class PersonnelRemovalType extends BaseModel {
    name!: string;

    static tableName = 'personnel_removal_types';
}

export default PersonnelRemovalType;
