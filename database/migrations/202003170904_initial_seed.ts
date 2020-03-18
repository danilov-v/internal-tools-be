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
                { id: 1, name: 'генерал-полковник', value: 1 },
                { id: 2, name: 'генерал-лейтенант', value: 2 },
                { id: 3, name: 'генерал-майор', value: 3 },
                { id: 4, name: 'полковник', value: 4 },
                { id: 5, name: 'подполковник', value: 5 },
                { id: 6, name: 'майор', value: 6 },
                { id: 7, name: 'капитан', value: 7 },
                { id: 8, name: 'старший лейтенант', value: 8 },
                { id: 9, name: 'лейтенант', value: 9 },
                { id: 10, name: 'младший лейтенант', value: 10 },
                { id: 11, name: 'старший прапорщик', value: 11 },
                { id: 12, name: 'прапорщик', value: 12 },
                { id: 13, name: 'старшина', value: 13 },
                { id: 14, name: 'старший сержант', value: 14 },
                { id: 15, name: 'сержант', value: 15 },
                { id: 16, name: 'младший сержант', value: 16 },
                { id: 17, name: 'ефрейтор', value: 17 },
                { id: 18, name: 'рядовой', value: 18 },
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
                    first_name: 'Админ',
                    middle_name: 'Админович',
                    last_name: 'Админов',
                    birthday: new Date(2020, 30, 17).toDateString(),
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
                    password: '$2a$10$5Ka8Yx5WmBF64PRrTmPZgez8oHDTRFhCeOV9T1EMiBeHPLkDsqqfO', //'admin' Used bcrypt with rounds = 10 (default)
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
    return Promise.all([
        knex('auth').del(),
        knex('roles').del(),
        knex('users').del(),
        knex('ranks').del(),
        knex('units').del(),
        knex('unit_types').del()
    ]);
}
