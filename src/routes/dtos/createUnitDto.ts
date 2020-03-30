export class CreateUnitDto {
    name: string;
    typeId: number;
    parentUnit: number | undefined;
}
