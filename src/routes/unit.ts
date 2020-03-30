import express from 'express';
import unitService from '../business/unit.service';

const unitRouter = express.Router();

unitRouter.post('/', async (req, res) => {
    const unit = await unitService.createOrGetExistingUnit(req.body);
    res.json(unit);
});

unitRouter.get('/', async (req, res) => {
    const units = await unitService.findAllUnits();
    res.json(units);
});

export default unitRouter;
