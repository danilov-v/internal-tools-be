import express from 'express';
import logger from '../common/logger';
import Personnel from '../data/personnel';
import User from '../data/user';
import Unit from '../data/unit';
const personnelRouter = express.Router();

function extractIds(units: Unit[]) {
    const ids: number[] = [];

    units.map(function (unit) {
        ids.push(unit.id);
        ids.push(...extractIds(unit.children));
    });

    return ids;
}

personnelRouter.get('/personnel', async function (req, res) {
    try {
        const unitId = Number(req.query.unitId);

        if (!unitId) {
            res.status(400);
            return res.json({ message: 'Unit id has to be specified' });
        }

        const units = await Unit.query()
            .withGraphFetched('children.^')
            .where('id', unitId);

        const childUnitIds = extractIds(units);

        const personnel = await Personnel.query()
            .withGraphJoined('user')
            .withGraphJoined('unit')
            .whereIn('unit_id', childUnitIds);

        const result = personnel.map(function (x) {
            return {
                id: x.id,
                firstName: x.user.firstName,
                lastName: x.user.lastName,
                middleName: x.user.middleName,
                calledAt: x.calledAt,
                demobilizationAt: x.demobilizationAt,
                unitId: x.unitId
            };
        });

        res.json(result);
    } catch (err) {
        logger.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    }
});

personnelRouter.get('/personnel/:personnelId', async function (req, res) {
    try {
        const personnelId = Number(req.params['personnelId']);

        if (!personnelId) {
            res.status(400);
            return res.json({ message: 'Personnel id has to be specified' });
        }

        const personnel = await Personnel.query()
            .withGraphJoined('user')
            .findById(personnelId);

        if (!personnel) {
            res.status(404);
            return res.json({ message: `Personnel with id ${personnelId} not found` });
        }

        const result = {
            id: personnel.id,
            firstName: personnel.user.firstName,
            lastName: personnel.user.lastName,
            middleName: personnel.user.middleName,
            calledAt: personnel.calledAt,
            demobilizationAt: personnel.demobilizationAt,
            phone: personnel.user.phone,
            comment: personnel.comment,
            birthday: personnel.user.birthday,
            position: personnel.user.position,
            unitId: personnel.unitId,
            rankId: personnel.user.rankId
        };

        res.json(result);
    } catch (err) {
        logger.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    }
});

personnelRouter.post('/personnel', async function (req, res) {
    try {
        const result = await Personnel.transaction(async function (trx) {
            const user = await User.query(trx).insert({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleName: req.body.middleName,
                phone: req.body.phone,
                birthday: req.body.birthday,
                position: req.body.position,
                rankId: req.body.rankId,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                createdBy: (req.user as any).id
            });
            const personnel = await Personnel.query(trx).insert({
                calledAt: req.body.calledAt,
                demobilizationAt: req.body.demobilizationAt,
                comment: req.body.comment,
                unitId: req.body.unitId,
                userId: user.id
            });
            return {
                id: personnel.id,
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName,
                calledAt: personnel.calledAt,
                demobilizationAt: personnel.demobilizationAt,
                phone: user.phone,
                comment: personnel.comment,
                birthday: user.birthday,
                position: user.position,
                unitId: personnel.unitId,
                rankId: user.rankId
            };
        });

        res.json(result);
    } catch (err) {
        logger.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    }
});

export default personnelRouter;
