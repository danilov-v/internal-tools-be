import { Expose } from 'class-transformer';

export class PersonnelRemovalDto {
    @Expose()
    personnelId: number = null;

    @Expose()
    typeId: number = null;

    @Expose()
    comment: string = null;

    createdBy: number;
}
