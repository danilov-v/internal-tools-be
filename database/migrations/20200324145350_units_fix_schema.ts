import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable('units', builder => {
        builder.dropUnique(['name']);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.alterTable('units', builder => {
        builder.unique(['name']);
    });
}
