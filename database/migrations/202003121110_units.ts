import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('units', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
        table.integer('type_id').notNullable().references('id').inTable('unit_types');
        table.integer('parent_unit').references('id').inTable('units');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('units');
}
