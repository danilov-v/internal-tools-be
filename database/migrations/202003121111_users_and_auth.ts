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
    }).createTable('auth', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('login').unique().notNullable();
        table.string('password').notNullable();
        table.dateTime('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.integer('created_by').notNullable().references('id').inTable('auth');
        table.dateTime('deleted_at', { useTz: false });
        table.integer('deleted_by').references('id').inTable('auth');
        table.integer('role_id').notNullable().references('id').inTable('roles');
        table.integer('user_id').notNullable().references('id').inTable('users');
    }).table('users', (table) => {
        table.foreign('created_by').references('auth.id');
        table.foreign('updated_by').references('auth.id');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('auth');
}
