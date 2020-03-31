exports.seed = async function(knex) {
    await Promise.all([
        knex('roles').insert([
            { name: 'admin' },
            { name: 'viewer' }
        ]),
        knex('ranks').insert([
            { name: 'генерал-полковник', value: 180 },
            { name: 'генерал-лейтенант', value: 170 },
            { name: 'генерал-майор', value: 160 },
            { name: 'полковник', value: 150 },
            { name: 'подполковник', value: 140 },
            { name: 'майор', value: 130 },
            { name: 'капитан', value: 120 },
            { name: 'старший лейтенант', value: 110 },
            { name: 'лейтенант', value: 100 },
            { name: 'младший лейтенант', value: 90 },
            { name: 'старший прапорщик', value: 80 },
            { name: 'прапорщик', value: 70 },
            { name: 'старшина', value: 60 },
            { name: 'старший сержант', value: 50 },
            { name: 'сержант', value: 40 },
            { name: 'младший сержант', value: 30 },
            { name: 'ефрейтор', value: 20 },
            { name: 'рядовой', value: 10 }
        ]),
        knex('unit_types').insert([
            { name: 'воинская часть' },
            { name: 'бригада' },
            { name: 'батальон' },
            { name: 'рота' },
            { name: 'взвод' },
            { name: 'отделение' }
        ])
    ]);

    await knex('units').insert([
        { name: 'военная академия', parent_unit: null, type_id: 1 },
        { name: 'центр обеспечения учебного процесса', parent_unit: 1, type_id: 2 },
        { name: 'рота информационных технологий', parent_unit: 2, type_id: 4 }
    ]);

    await knex('users').insert([
        {
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
    ]);

    await knex('auth').insert([
        {
            login: 'admin',
            password: '$2a$10$5Ka8Yx5WmBF64PRrTmPZgez8oHDTRFhCeOV9T1EMiBeHPLkDsqqfO',
            created_at: knex.fn.now(),
            created_by: 1,
            deleted_at: null,
            deleted_by: null,
            role_id: 1,
            user_id: 1
        }
    ]);
};
