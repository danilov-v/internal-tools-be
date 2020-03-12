import * as express from 'express';
import * as morgan from 'morgan';
import * as knex from 'knex';
import * as path from 'path';
import { Model, raw } from 'objection';
import config from './common/config';
import logger from './common/logger';

const app = express();

// postgres://username:password@host:port/database
const connection = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'it_tools',
    },
    migrations: {
        directory: path.join(__dirname, '..', 'database/migrations'),
    },
    seeds: {
        directory: path.join(__dirname, '..', 'database/seeds'),
    },
    searchPath: ['knex', 'public'],
});

app.use(
    morgan('HTTP/:http-version :method :url - :status (:res[content-length])', {
        stream: {
            write(str: string): void {
                logger.info(str);
            },
        },
    }),
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

Model.knex(connection);
connection.migrate.latest().then(() => {
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
});
