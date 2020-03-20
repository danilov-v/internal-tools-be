module.exports = {
    client: 'pg',
    connection: require('./config.json').dbConnectionString,
    migrations: {
        directory: 'database/migrations',
        extension: 'ts'
    },
    seeds: {
        directory: 'database/seeds',
        extension: 'js'
    }
};
