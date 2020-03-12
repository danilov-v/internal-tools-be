module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'postgres',
            database: 'it_tools'
        },
        migrations: {
            directory: __dirname + '/database/migrations'
        },
        seeds: {
            directory: __dirname + '/database/seeds'
        }
    },

    // TODO добавить(настроить) профиль production
    production: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'postgres',
            database: 'it_tools'
        },
        migrations: {
            directory: __dirname + '/database/migrations'
        },
        seeds: {
            directory: __dirname + '/database/seeds'
        }
    }
};
