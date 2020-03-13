import * as express from 'express';
import * as morgan from 'morgan';
import * as Knex from 'knex';
import * as path from 'path';
import { Model } from 'objection';
import config from './common/config';
import logger from './common/logger';

const app = express();

const knex = Knex({
    client: 'pg',
    connection: config.dbConnectionString,
    migrations: {
        directory: path.join(__dirname, '..', 'database/migrations')
    },
    seeds: {
        directory: path.join(__dirname, '..', 'database/seeds')
    }
});

app.use(
    morgan('HTTP/:http-version :method :url - :status (:res[content-length])', {
        stream: {
            write(str: string): void {
                logger.info(str);
            }
        }
    })
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

Model.knex(knex);

knex.migrate.latest().then((res) => {
    logger.info(`Ran migrations:\n\t${res[1].join('\n\t')}`);
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
});
