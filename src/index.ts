import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import CustomStrategy from 'passport-custom';
import morgan from 'morgan';
import Knex from 'knex';
import path from 'path';
import { Model } from 'objection';
import config from './common/config';
import logger from './common/logger';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import { authenticateRoutesExcept } from './express-middleware/auth';
import authService from './business/auth.service';
import personnelRouter from './routes/personnel';

// Passport
passport.use(new CustomStrategy.Strategy(async function (req, done) {
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

passport.serializeUser(function (req, user, done) {
    req.session.user = user;
    done(null, user);
});

passport.deserializeUser(function (req, user, done) {
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
knex.on('query', query => {
    logger.debug(query.sql);
});
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

app.get('/', function (req, res) {
    res.json({ message: 'Hello World!' });
});

app.use(authRouter);
app.use(personnelRouter);

knex.migrate.latest().then((res) => {
    logger.info(`Ran migrations:\n\t${res[1].join('\n\t')}`);
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
});
