import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('promotion_types', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
        table.integer('value').notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('promotion_types');
}
