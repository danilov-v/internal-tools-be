import express from 'express';
import { ArgumentError } from 'ow';
import { plainToClass } from 'class-transformer';
import logger from '../common/logger';
import Personnel from '../data/personnel';
import User from '../data/user';
import Unit from '../data/unit';
import { CreatePersonnelDto, PersonnelDetailsDto, PersonnelInfoDto } from './dtos';
import {
    validateCreatePersonnelRequest,
    validateGetPersonnelByIdRequest,
    validateGetPersonnelRequest
} from './request-validators';

const personnelRouter = express.Router();

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

personnelRouter.get('/personnel', async function (req, res) {
    try {
        validateGetPersonnelRequest(req);
        const unitId = Number(req.query.unitId);

        const units = await Unit.query()
            .withGraphFetched('children.^')
            .where('id', unitId);

        const extractIds = (units: Unit[]): number[] => units.flatMap(unit => [ unit.id, ...extractIds(unit.children) ]);

        const childUnitIds = extractIds(units);

        const personnel = await Personnel.query()
            .withGraphJoined('user')
            .withGraphJoined('unit')
            .whereIn('unit_id', childUnitIds);

        res.json(personnel.map(x => new PersonnelInfoDto(x)));
    } catch (err) {
        processError(err, res);
    }
});

personnelRouter.get('/personnel/:personnelId', async function (req, res) {
    try {
        validateGetPersonnelByIdRequest(req);
        const personnelId = Number(req.params.personnelId);

        const personnel = await Personnel.query()
            .withGraphJoined('user')
            .findById(personnelId);

        if (!personnel) {
            res.status(404);
            return res.json({ message: `Personnel with id ${personnelId} not found` });
        }

        res.json(new PersonnelDetailsDto(personnel.user, personnel));
    } catch (err) {
        processError(err, res);
    }
});

personnelRouter.post('/personnel', async function (req, res) {
    try {
        validateCreatePersonnelRequest(req);
        const dto = plainToClass(CreatePersonnelDto, req.body);

        const result = await Personnel.transaction(async function (trx) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const user = await User.query(trx).insert(dto.getUser((req.user as any).id));
            const personnel = await Personnel.query(trx).insert(dto.getPersonnel(user.id));
            return new PersonnelDetailsDto(user, personnel);
        });

        res.json(result);
    } catch (err) {
        processError(err, res);
    }
});

export default personnelRouter;
