import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { DBError, ValidationError } from 'objection';
import logger from '../common/logger';
import { ArgumentError } from 'ow';

const errors: Array<{ class: Function; status: number; message: (Error) => string }> = [
    { class: ArgumentError, status: 400, message: (err) => err.message },
    { class: ValidationError, status: 403, message: (err) => `Request validation failed. ${err.message}` },
    { class: DBError, status: 500, message: () => 'Internal database error.' },
    { class: Error, status: 500, message: () => 'Internal server error.' }
];

function errorHandler(): ErrorRequestHandler {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err);
        for (const error of errors) {
            if (err instanceof error.class) {
                res.status(error.status).send(error.message(err));
                break;
            }
        }
    };
}

export default errorHandler;
