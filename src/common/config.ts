import * as convict from 'convict';

interface Config {
    readonly port: number;

    readonly logFile: string;
    readonly maxLogFileSize: number;
    readonly minLogLevel: string;
}

function environment(name: string) {
    return 'IT_TOOLS_' + name;
}

const configuration = convict({
    port: {
        doc: 'Port to be used by the app',
        format: 'port',
        default: 3000,
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
    }
}).loadFile('config.json');

const config: Config = {
    port: configuration.get('port'),
    logFile: configuration.get('logFile'),
    minLogLevel: configuration.get('minLogLevel'),
    maxLogFileSize: configuration.get('maxLogFileSize')
};

export default config;
