import express from 'express';
import unitService from '../business/unit.service';

const unitRouter = express.Router();

unitRouter.post('/', async (req, res, next) => {
    try {
        const unit = await unitService.createOrGetExistingUnit(req.body);
        res.json(unit);
    } catch (e) {
        next(e);
    }
});

unitRouter.get('/', async (req, res, next) => {
    try {
        const units = await unitService.findAllUnits();
        res.json(units);
    } catch (e) {
        next(e);
    }
});

export default unitRouter;
