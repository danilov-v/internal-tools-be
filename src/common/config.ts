import convict from 'convict';

function environment(name: string) {
    return 'IT_TOOLS_' + name;
}

const configuration = convict({
    port: {
        doc: 'Port to be used by the app',
        format: 'port',
        default: 3001,
        env: environment('PORT')
    },

    logFile: {
        doc: 'File to write logs to',
        format: String,
        default: 'it-tools.logs.log',
        env: environment('LOG_FILE')
    },
    minLogLevel: {
        doc: 'Minimal log level to be written. It is winston\'s log level',
        format: String,
        default: 'info',
        env: environment('MIN_LOG_LEVEL')
    },
    maxLogFileSize: {
        doc: 'Max log file size in bytes',
        format: 'int',
        default: 1024*1024*4,
        env: environment('LOG_FILE')
    },

    dbConnectionString: {
        doc: 'Connection string to the database',
        format: '*',
        default: 'postgres://postgres:postgres@localhost:5432/it_tools',
        env: environment('DB_CONNECTION_STRING')
    },

    cookieSecret: {
        doc: 'Secret to be used by cookies',
        format: '*',
        default: 'not_so_secret_secret',
        env: environment('COOKIE_SECRET')
    },

    corsOrigin: {
        doc: 'Origin to allow via cors',
        format: 'url',
        default: 'http://localhost:3000',
        env: environment('CORS_ORIGIN')
    }
}).loadFile('config.json');

interface Config {
    readonly port: number;

    readonly logFile: string;
    readonly maxLogFileSize: number;
    readonly minLogLevel: string;

    readonly dbConnectionString: string;

    readonly cookieSecret: string;

    readonly corsOrigin: string;
}

const config: Config = {
    port: configuration.get('port'),
    logFile: configuration.get('logFile'),
    minLogLevel: configuration.get('minLogLevel'),
    maxLogFileSize: configuration.get('maxLogFileSize'),
    dbConnectionString: configuration.get('dbConnectionString'),
    cookieSecret: configuration.get('cookieSecret'),
    corsOrigin: configuration.get('corsOrigin')
};

export default config;
