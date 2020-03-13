import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('roles', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('roles');
}
