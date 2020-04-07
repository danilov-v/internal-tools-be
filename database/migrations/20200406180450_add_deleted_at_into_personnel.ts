import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable('personnel', builder => {
        builder.date('deleted_at');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.alterTable('personnel', builder => {
        builder.dropColumn('deleted_at');
    });
}
