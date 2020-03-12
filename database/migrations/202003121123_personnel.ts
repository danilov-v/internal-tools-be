import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personnel', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.date('called_at').notNullable();
        table.date('demobilization_at');
        table.text('comment');
        table.integer('unit_id').notNullable().references('id').inTable('units');
        table.integer('user_id').notNullable().references('id').inTable('users');

        table.index(['demobilization_at']);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personnel');
}
