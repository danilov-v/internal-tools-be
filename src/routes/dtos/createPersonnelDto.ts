import { Expose, Transform, Type } from 'class-transformer';
import { dateTransformer, optionalDateTransformer } from '../../utils/transformers';

export class CreatePersonnelDto {
    @Expose() firstName: string;
    @Expose() lastName: string;
    @Expose() middleName: string | null;
    @Expose() @Transform(dateTransformer) calledAt: Date;
    @Expose() @Transform(optionalDateTransformer) demobilizationAt: Date | null;
    @Expose() phone: string;
    @Expose() comment: string | null;
    @Expose() @Transform(dateTransformer) birthday: Date;
    @Expose() position: string;
    @Expose() @Type(() => Number) unitId: number;
    @Expose() @Type(() => Number) rankId: number;

    getUser(userId: number) {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            phone: this.phone,
            birthday: this.birthday,
            position: this.position,
            rankId: this.rankId,
            createdBy: userId
        };
    }

    getPersonnel(userId: number) {
        return {
            calledAt: this.calledAt,
            demobilizationAt: this.demobilizationAt,
            comment: this.comment,
            unitId: this.unitId,
            userId: userId
        };
    }
}
