import BaseModel from './base.model';
import UnitType from './unitType';
import { Model, RelationMappings } from 'objection';

class Unit extends BaseModel {
    name!: string;
    typeId!: number;
    parentUnit?: number;

    type?: UnitType;
    parent?: Unit;
    children?: Unit[];

    static tableName = 'units';

    static relationMappings: RelationMappings = {
        type: {
            relation: Model.BelongsToOneRelation,
            modelClass: UnitType,
            join: {
                from: `${Unit.tableName}.type_id`,
                to: `${UnitType.tableName}.id`
            }
        },
        parent: {
            relation: Model.BelongsToOneRelation,
            modelClass: Unit,
            join: {
                from: `${Unit.tableName}.parent_unit`,
                to: `${Unit.tableName}.id`
            }
        },
        children: {
            relation: Model.HasManyRelation,
            modelClass: Unit,
            join: {
                from: `${Unit.tableName}.id`,
                to: `${Unit.tableName}.parent_unit`
            }
        }
    };
}

export default Unit;
