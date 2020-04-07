import { Expose, Transform, Type } from 'class-transformer';
import { dateTransformer, optionalDateTransformer } from '../../utils/transformers';

class UpdatePersonnelDto {

    @Expose()
    personnelId: number = null;

    @Expose()
    firstName: string = null;

    @Expose()
    lastName: string = null;

    @Expose()
    middleName?: string = null;

    @Expose()
    @Transform(dateTransformer)
    calledAt: Date = null;

    @Expose()
    @Transform(optionalDateTransformer)
    demobilizationAt?: Date = null;

    @Expose()
    phone: string = null;

    @Expose()
    comment?: string = null;

    @Expose()
    @Transform(dateTransformer)
    birthday: Date = null;

    @Expose()
    position: string = null;

    @Expose()
    @Type(() => Number)
    unitId: number = null;

    @Expose()
    @Type(() => Number)
    rankId: number = null;

    @Expose()
    @Type(() => Number)
    updatedBy: number = null;
}

export default UpdatePersonnelDto;
