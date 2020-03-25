import express from 'express';
import unitService from "../business/unit.service";

const unitRouter = express.Router();

unitRouter.post('/create', async (req, res) => {
    let unit = await unitService.findOrCreate(req.query);
    if (unit) {
        res.status(200);
        res.json(unit);
    } else {
        res.status(400);
        res.json({ message: 'Incorrect data' });
    }
});

unitRouter.get('/:unitId', async (req, res) => {
    let unit = await unitService.findUnit(req.params.unitId);
    if (unit) {
        res.status(200);
        res.json(unit);
    } else {
        res.status(400);
        res.json({ message: 'Incorrect data' });
    }
});

export default unitRouter;
