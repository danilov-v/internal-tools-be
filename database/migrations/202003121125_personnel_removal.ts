import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personnel_removal', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.dateTime('created_at').notNullable(); // TODO add default value: now()
        table.integer('created_by').notNullable().references('id').inTable('auth');
        table.integer('personnel_id').notNullable().references('id').inTable('personnel');
        table.integer('type_id').notNullable().references('id').inTable('personnel_removal_types');
        table.text('comment');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personnel_removal');
}
