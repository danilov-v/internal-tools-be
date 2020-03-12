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
        table.dateTime('created_at').notNullable(); // TODO add default value: now()
        table.integer('created_by').notNullable().references('id').inTable('auth');
        table.dateTime('updated_at');
        table.integer('updated_by').references('id').inTable('auth');

        table.index(['first_name', 'last_name', 'middle_name'], 'full_name');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('users');
}
