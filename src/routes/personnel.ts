import express from 'express';
import logger from '../common/logger';
import Personnel from '../data/personnel';
import User from '../data/user';
import Unit from '../data/unit';
import { CreatePersonnelDto } from './dtos/createPersonnelDto';
import { PersonnelDetailsDto } from './dtos/personnelDetailsDto';
import { PersonnelInfoDto } from './dtos/personnelInfoDto';
import { ArgumentError } from 'ow';
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

        res.json(personnel.map(function (x) {
            return new PersonnelInfoDto(x);
        }));
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

        res.json(new PersonnelDetailsDto(personnel.user, personnel));
    } catch (err) {
        logger.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    }
});

personnelRouter.post('/personnel', async function (req, res) {
    try {
        const dto = CreatePersonnelDto.create(req.body);

        const result = await Personnel.transaction(async function (trx) {
            const user = await User.query(trx).insert(dto.getUser(1/* (req.user as any).id */));
            const personnel = await Personnel.query(trx).insert(dto.getPersonnel(user.id));
            return new PersonnelDetailsDto(user, personnel);
        });

        res.json(result);
    } catch (err) {
        if (err instanceof ArgumentError) {
            logger.info(`Validation failed: ${err}`);
            res.status(400);
            return res.json({ message: err.message });
        }

        logger.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    }
});

export default personnelRouter;
