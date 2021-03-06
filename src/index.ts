import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import CustomStrategy from 'passport-custom';
import morgan from 'morgan';
import Knex from 'knex';
import path from 'path';
import { Model } from 'objection';
import bodyParser from 'body-parser';

import config from './common/config';
import logger from './common/logger';
import { authenticateRoutesExcept } from './express-middleware/auth';
import authRouter from './routes/auth';
import authService from './business/auth.service';
import personnelRouter from './routes/personnel';
import rankRouter from './routes/rank';
import unitRouter from './routes/unit';
import errorHandler from './express-middleware/error.handler';
import unitTypeRouter from './routes/unitType';

// Passport
passport.use(new CustomStrategy.Strategy(async (req, done) => {
    const login = req.body.login.toString();
    const password = req.body.password.toString();

    const authInfo = await authService.getByCredentials(login, password);

    if (authInfo === null) {
        return done(null, false);
    }

    return done(null, {
        id: authInfo.id,
        login: authInfo.login,
        role: authInfo.role,
        firstName: authInfo.firstName,
        lastName: authInfo.lastName,
        middleName: authInfo.middleName
    });
}));

passport.serializeUser((req, user, done) => {
    req.session.user = user;
    done(null, user);
});

passport.deserializeUser((req, user, done) => {
    done(null, user);
});

// Knex
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
if (config.logQueries) {
    knex.on('query', query => logger.debug(query.sql));
}
Model.knex(knex);

const app = express();
app.use(
    morgan('HTTP/:http-version :method :url - :status (:res[content-length])', {
        stream: {
            write(str: string): void {
                logger.info(str);
            }
        }
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(cookieSession({
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    name: 'session',
    secret: config.cookieSecret,
    signed: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authenticateRoutesExcept([ '/login' ]));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.use(authRouter);
app.use('/personnel', personnelRouter);
app.use('/rank', rankRouter);
app.use('/unit', unitRouter);
app.use('/unit-type', unitTypeRouter);

app.use(errorHandler());

knex.migrate.latest().then((res) => {
    if (res[1].length > 0) {
        logger.info(`Ran migrations:\n\t${res[1].join('\n\t')}`);
    }

    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
});
