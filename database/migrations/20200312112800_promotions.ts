import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('promotions', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.dateTime('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.integer('created_by').notNullable();
        table.dateTime('closed_at', { useTz: false });
        table.integer('closed_by');
        table.text('comment');
        table.integer('type_id').notNullable().references('id').inTable('promotion_types');
        table.integer('personnel_id').notNullable().references('id').inTable('personnel');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('promotions');
}
