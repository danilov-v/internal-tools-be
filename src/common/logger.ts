import { createLogger, format, transports } from 'winston';
import config from './config';

function getMetadata(info) {
    const keysAmount = Object.keys(info.metadata).length;
    if (keysAmount === 1 && info.metadata.stack) {
        return '';
    }
    if (keysAmount === 0) {
        return '';
    }

    return JSON.stringify(info.metadata);
}

const customFormat = format.printf(info => {
    const error = info.metadata.stack ? info.metadata.stack : '';
    const metadata = getMetadata(info);
    return `[${info.timestamp}] [${info.level}] ${info.message} ${metadata} ${error}`;
});
const logger = createLogger({
    level: config.minLogLevel,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
        format.metadata({ fillExcept: [ 'message', 'level', 'timestamp' ] }),
        format.errors({ stack: true })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                customFormat
            )
        }),
        new transports.File({
            filename: config.logFile,
            maxsize: config.maxLogFileSize,
            format: format.combine(
                customFormat
            )
        })
    ]
});

export default logger;
