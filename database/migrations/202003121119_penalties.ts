import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('penalties', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.dateTime('created_at').notNullable(); // TODO add default value: now()
        table.integer('created_by').notNullable().references('id').inTable('auth');
        table.dateTime('closed_at');
        table.integer('closed_by').references('id').inTable('auth');
        table.text('comment');
        table.integer('type_id').notNullable().references('id').inTable('penalty_types');
        table.integer('personnel_id').notNullable().references('id').inTable('personnel');

        table.index(['personnel_id']);
        table.index(['closed_at', 'personnel_id'], 'closed');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('penalties');
}
