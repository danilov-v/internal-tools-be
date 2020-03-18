import BaseModel from './base.model';
import UnitType from './unitType';
import { Model, RelationMappings } from 'objection';

class Unit extends BaseModel {
    name!: string;

    type!: UnitType;
    unit: Unit;

    static relationMappings: RelationMappings = {
        role: {
            relation: Model.HasOneRelation,
            modelClass: UnitType,
            join: {
                from: 'units.type_id',
                to: 'unit_types.id'
            }
        },
        user: {
            relation: Model.HasOneRelation,
            modelClass: Unit,
            join: {
                from: 'units.parent_unit',
                to: 'units.id'
            }
        }
    };

    static tableName = 'units';
}

export default Unit;
