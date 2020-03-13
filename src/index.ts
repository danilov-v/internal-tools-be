import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import morgan from 'morgan';
import Knex from 'knex';
import path from 'path';
import { Model } from 'objection';
import config from './common/config';
import logger from './common/logger';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';

passport.use(new LocalStrategy.Strategy(function(username, password, done) {
    if (username === 'admin' && password === 'admin') {
        return done(null, { username: username, role: 'admin' });
    }

    return done(null, false, { message: 'Invalid credentials' });
}));

passport.serializeUser(function (req, user, done) {
    req.session.user = user;
    done(null, user);
});

passport.deserializeUser(function (req, user, done) {
    done(null, user);
});

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
app.use(cookieSession({
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    name: 'session',
    secret: config.cookieSecret
}));
app.use(passport.initialize());
app.use(passport.session());

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
Model.knex(knex);

app.get('/', passport.authenticate('local', { session: true }), function (req, res) {
    res.send('Hello World!');
});

app.use(authRouter);

knex.migrate.latest().then((res) => {
    logger.info(`Ran migrations:\n\t${res[1].join('\n\t')}`);
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
});
