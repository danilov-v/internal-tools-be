import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personnel_removal', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.dateTime('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.integer('created_by').notNullable();
        table.integer('personnel_id').notNullable().references('id').inTable('personnel');
        table.integer('type_id').notNullable().references('id').inTable('personnel_removal_types');
        table.text('comment');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personnel_removal');
}
