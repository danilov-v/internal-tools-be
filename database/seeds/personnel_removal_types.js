exports.seed = async knex => {

    await knex('personnel_removal_types').insert([
        { name: 'Демобилизация' },
        { name: 'Обычное удаление' }
    ]);
};
