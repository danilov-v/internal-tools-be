import BaseModel from './base.model';
import UnitType from './unitType';
import { Model, RelationMappings } from 'objection';

class Unit extends BaseModel {
    name!: string;
    typeId: number;
    parentUnit?: number;

    type!: UnitType;
    parent?: Unit;
    children: Unit[];

    static relationMappings: RelationMappings = {
        type: {
            relation: Model.HasOneRelation,
            modelClass: UnitType,
            join: {
                from: 'units.type_id',
                to: 'unit_types.id'
            }
        },
        parent: {
            relation: Model.HasOneRelation,
            modelClass: Unit,
            join: {
                from: 'units.parent_unit',
                to: 'units.id'
            }
        },
        children: {
            relation: Model.HasManyRelation,
            modelClass: Unit,
            join: {
                from: 'units.id',
                to: 'units.parent_unit'
            }
        }
    };

    static tableName = 'units';
}

export default Unit;
