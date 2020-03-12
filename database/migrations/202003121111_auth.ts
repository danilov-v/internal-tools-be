import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('auth', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('login').unique().notNullable();
        table.string('password').notNullable();
        table.dateTime('created_at').notNullable(); // TODO add default value: now()
        table.integer('created_by').notNullable().references('id').inTable('auth');
        table.dateTime('deleted_at');
        table.integer('deleted_by').references('id').inTable('auth');
        table.integer('role_id').notNullable().references('id').inTable('roles');
        table.integer('user_id').notNullable().references('id').inTable('users');

        table.index(['login']);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('auth');
}
