import { Expose, Transform, Type } from 'class-transformer';
import { dateTransformer, optionalDateTransformer } from '../../utils/transformers';

export class CreatePersonnelDto {
    @Expose() firstName: string = null;
    @Expose() lastName: string = null;
    @Expose() middleName: string | null = null;
    @Expose() @Transform(dateTransformer) calledAt: Date = null;
    @Expose() @Transform(optionalDateTransformer) demobilizationAt: Date | null = null;
    @Expose() phone: string = null;
    @Expose() comment: string | null = null;
    @Expose() @Transform(dateTransformer) birthday: Date = null;
    @Expose() position: string = null;
    @Expose() @Type(() => Number) unitId: number = null;
    @Expose() @Type(() => Number) rankId: number = null;
    @Expose() @Type(() => Number) createdBy: number = null;
}
