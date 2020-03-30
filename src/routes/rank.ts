import express from 'express';
import { ArgumentError } from 'ow';
import logger from '../common/logger';
import Rank from '../data/rank';
import { RankInfoDto } from './dtos';

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

rankRouter.get('/rank', async function(req, res) {
    try {
        const ranks = await Rank.query();

        res.json(ranks.map(x => new RankInfoDto(x)));
    } catch (err) {
        processError(err, res);
    }
});

export default rankRouter;
