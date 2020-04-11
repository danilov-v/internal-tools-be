import express from 'express';
import { plainToClass } from 'class-transformer';
import rankService from '../business/rank.service';
import { RankInfoDto } from './dtos';

const rankRouter = express.Router();

rankRouter.get('', async (req, res, next) => {
    try {
        const ranks = await rankService.getAllRanks();
        res.json(plainToClass(RankInfoDto, ranks));
    } catch (e) {
        next(e);
    }
});

rankRouter.get('/:rankId', async (req, res, next) => {
    try {
        const rankId = Number.parseInt(req.params.rankId);
        const ranks = await rankService.getRankById(rankId);
        res.json(plainToClass(RankInfoDto, ranks));
    } catch (e) {
        next(e);
    }
});

export default rankRouter;
