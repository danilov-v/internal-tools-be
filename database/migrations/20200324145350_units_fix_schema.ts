import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable('units', builder => {
        builder.dropUnique(['name']);
        builder.unique(['name', 'parent_unit']);
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.alterTable('units', builder => {
        builder.dropUnique(['name', 'parent_unit']);
        builder.unique(['name']);
    });
}
