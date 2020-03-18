import express from 'express';
import personnelService from '../business/personnel.service';
const personnelRouter = express.Router();

personnelRouter.get('/personnel', function (req, res) {
    const unitId = Number(req.query.unitId);

    if (!unitId) {
        res.status(400);
        return res.json({ message: 'Unit id has to be specified' });
    }

    personnelService.getByUnitId(unitId).then(function (personnel) {
        const result = personnel.map(function (x) {
            return {
                id: x.id,
                firstName: x.firstName,
                lastName: x.lastName,
                middleName: x.middleName,
                calledAt: x.calledAt,
                demobilizationAt: x.demobilizationAt,
                unit: {
                    id: x.unit.id,
                    name: x.unit.name
                }
            };
        });

        res.json(result);
    });
});

export default personnelRouter;
