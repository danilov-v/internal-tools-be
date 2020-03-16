import express from 'express';
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
import Auth from './data/auth';
import { compare } from 'bcrypt';
import { authenticateRoutesExcept } from './express-middleware/auth';

// Passport
passport.use(new CustomStrategy.Strategy(function (req, done) {
    const login = req.body.login;
    const password = req.body.password;

    Auth.getByLogin(login).then(function (auth) {
        if (auth === null) {
            return done(null, false);
        }

        compare(password.toString(), auth.password).then(function (isPasswordValid) {
            if (!isPasswordValid) {
                return done(null, false);
            }

            return done(null, { username: auth.login, role: auth.role.name });
        });
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
    res.send('Hello World!');
});

app.use(authRouter);

knex.migrate.latest().then((res) => {
    logger.info(`Ran migrations:\n\t${res[1].join('\n\t')}`);
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
});
