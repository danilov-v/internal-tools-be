import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return Promise.all([
        knex('roles')
            .insert([
                { id: 1, name: 'admin' },
                { id: 2, name: 'viewer' }
            ]),

        knex('ranks')
            .insert([
                { id: 1, name: 'генерал-полковник', value: 180 },
                { id: 2, name: 'генерал-лейтенант', value: 170 },
                { id: 3, name: 'генерал-майор', value: 160 },
                { id: 4, name: 'полковник', value: 150 },
                { id: 5, name: 'подполковник', value: 140 },
                { id: 6, name: 'майор', value: 130 },
                { id: 7, name: 'капитан', value: 120 },
                { id: 8, name: 'старший лейтенант', value: 110 },
                { id: 9, name: 'лейтенант', value: 100 },
                { id: 10, name: 'младший лейтенант', value: 90 },
                { id: 11, name: 'старший прапорщик', value: 80 },
                { id: 12, name: 'прапорщик', value: 70 },
                { id: 13, name: 'старшина', value: 60 },
                { id: 14, name: 'старший сержант', value: 50 },
                { id: 15, name: 'сержант', value: 40 },
                { id: 16, name: 'младший сержант', value: 30 },
                { id: 17, name: 'ефрейтор', value: 20 },
                { id: 18, name: 'рядовой', value: 10 },
            ]),

        knex('unit_types')
            .insert([
                { id: 1, name: 'воинская часть' },
                { id: 2, name: 'бригада' },
                { id: 3, name: 'батальон' },
                { id: 4, name: 'рота' },
                { id: 5, name: 'взвод' },
                { id: 6, name: 'отделение' }
            ]),

        knex('units')
            .insert([
                { id: 1, name: 'военная академия', parent_unit: null, type_id: 1 },
                { id: 2, name: 'центр обеспечения учебного процесса', parent_unit: 1, type_id: 2 },
                { id: 3, name: 'рота информационных технологий', parent_unit: 2, type_id: 4 },
            ]),

        knex('users')
            .insert([
                {
                    id: 1,
                    first_name: 'Валентин',
                    middle_name: 'Егорович',
                    last_name: 'Гурьев',
                    birthday: new Date(1988, 6, 9).toDateString(),
                    phone: '+375291234567',
                    position: 'Администратор системы',
                    rank_id: 1,
                    created_at: knex.fn.now(),
                    created_by: 1,
                    updated_at: null,
                    updated_by: null
                }
            ]),

        knex('auth')
            .insert([
                {
                    id: 1,
                    login: 'admin',
                    password: '$2a$10$5Ka8Yx5WmBF64PRrTmPZgez8oHDTRFhCeOV9T1EMiBeHPLkDsqqfO',
                    created_at: knex.fn.now(),
                    created_by: 1,
                    deleted_at: null,
                    deleted_by: null,
                    role_id: 1,
                    user_id: 1
                }
            ])
    ]);
}

export async function down(knex: Knex): Promise<any> {
    return Promise.resolve();
}
