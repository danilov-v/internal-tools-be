import express from 'express';
import { ArgumentError } from 'ow';
import logger from '../common/logger';
import { RankInfoDto } from './dtos';
import { plainToClass } from 'class-transformer';
import rankService from '../business/rank.service';

const rankRouter = express.Router();

function processError(err: Error, res: express.Response) {
    if (err instanceof ArgumentError) {
        logger.info(`Validation failed: ${err}`);
        res.status(400);
        return res.json({ message: err.message });
    }

    logger.error(err);
    res.status(500);
    res.json({ message: 'Internal server error' });
}

rankRouter.get('/rank', async (req, res) => {
    try {
        const ranks = await rankService.getAllRanks();

        res.json(plainToClass(RankInfoDto, ranks));
    } catch (err) {
        processError(err, res);
    }
});

export default rankRouter;
