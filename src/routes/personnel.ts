import express from 'express';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import Personnel from '../data/personnel';
import User from '../data/user';
import Unit from '../data/unit';
import { CreatePersonnelDto, PersonnelDetailsDto, PersonnelInfoDto } from './dtos';
import {
    validateCreatePersonnelRequest,
    validateGetPersonnelByIdRequest,
    validateGetPersonnelRequest
} from './request-validators';
import personnelService from '../business/personnel.service';
import UpdatePersonnelDto from './dtos/updatePersonnelDto';
import { validateUpdatePersonnelRequest } from './request-validators/personnel';

const personnelRouter = express.Router();

personnelRouter.get('/personnel', async function (req, res, next) {
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
        next(err);
    }
});

personnelRouter.get('/personnel/:personnelId', async function (req, res, next) {
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
        next(err);
    }
});

personnelRouter.put('/personnel/:personnelId', async (req, res, next) => {
    try {
        validateUpdatePersonnelRequest(req);
        const dto = plainToClassFromExist(new UpdatePersonnelDto(), req.body, { excludeExtraneousValues: true });
        dto.updatedBy = (req.user as User).id;
        dto.personnelId = Number.parseInt(req.params.personnelId);
        await personnelService.updatePersonnel(dto);

        res.send();
    } catch (err) {
        next(err);
    }
});

personnelRouter.post('/personnel', async function (req, res, next) {
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
        next(err);
    }
});

export default personnelRouter;
