import express from 'express';
import unitTypeService from '../business/unitType.service';

const unitTypeRouter = express.Router();

unitTypeRouter.get('', async (req, res, next) => {
    try {
        res.json(await unitTypeService.getAll());
    } catch (e) {
        next(e);
    }
});

export default unitTypeRouter;
