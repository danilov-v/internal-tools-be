import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('middle_name');
        table.string('last_name').notNullable();
        table.date('birthday').notNullable();
        table.string('phone').notNullable();
        table.string('position');
        table.integer('rank_id').notNullable().references('id').inTable('ranks');
        table.dateTime('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.integer('created_by').notNullable();
        table.dateTime('updated_at', { useTz: false });
        table.integer('updated_by');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('users');
}
