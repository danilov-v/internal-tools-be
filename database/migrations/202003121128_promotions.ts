import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('promotions', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.dateTime('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.integer('created_by').notNullable().references('id').inTable('auth');
        table.dateTime('closed_at', { useTz: false });
        table.integer('closed_by').references('id').inTable('auth');
        table.text('comment');
        table.integer('type_id').notNullable().references('id').inTable('promotion_types');
        table.integer('personnel_id').notNullable().references('id').inTable('personnel');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('promotions');
}
