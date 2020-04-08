import express from 'express';
import { plainToClassFromExist } from 'class-transformer';
import {
    CreatePersonnelDto,
    PersonnelInfoDto,
    PersonnelRemovalDto,
    UpdatePersonnelDto
} from './dtos';
import {
    validateCreatePersonnelRequest,
    validateGetPersonnelByIdRequest,
    validateGetPersonnelRequest,
    validatePersonnelRemovalRequest,
    validateUpdatePersonnelRequest
} from './request-validators';
import personnelService from '../business/personnel.service';

const personnelRouter = express.Router();

personnelRouter.get('', async (req, res, next) => {
    try {
        validateGetPersonnelRequest(req);
        const personnel = await personnelService.getPersonnelByUnitId(Number(req.query.unitId));

        res.json(personnel.map(x => new PersonnelInfoDto(x)));
    } catch (err) {
        next(err);
    }
});

personnelRouter.get('/:personnelId(\\d+)', async (req, res, next) => {
    try {
        validateGetPersonnelByIdRequest(req);
        const personnelId = Number(req.params.personnelId);
        const personnelDetailsDto = await personnelService.getPersonnelById(personnelId);

        if (!personnelDetailsDto) {
            res.status(404);
            return res.json({ message: `Personnel with id ${personnelId} not found` });
        }

        res.json(personnelDetailsDto);
    } catch (err) {
        next(err);
    }
});

personnelRouter.put('/:personnelId(\\d+)', async (req, res, next) => {
    try {
        validateUpdatePersonnelRequest(req);
        const dto = plainToClassFromExist(new UpdatePersonnelDto(), req.body, { excludeExtraneousValues: true });
        dto.updatedBy = (req.user as { id: number }).id;
        dto.personnelId = Number.parseInt(req.params.personnelId);
        await personnelService.updatePersonnel(dto);

        res.send();
    } catch (err) {
        next(err);
    }
});

personnelRouter.post('', async (req, res, next) => {
    try {
        validateCreatePersonnelRequest(req);
        const dto = plainToClassFromExist(new CreatePersonnelDto(), req.body, { excludeExtraneousValues: true });
        dto.createdBy = (req.user as { id: number }).id;
        res.json(await personnelService.createPersonnel(dto));
    } catch (err) {
        next(err);
    }
});

personnelRouter.delete('', async (req, res, next) => {
    try {
        validatePersonnelRemovalRequest(req);
        const personnelRemovalDto = plainToClassFromExist(new PersonnelRemovalDto(), req.body, { excludeExtraneousValues: true });
        personnelRemovalDto.createdBy = (req.user as { id: number }).id;
        await personnelService.removePersonnel(personnelRemovalDto);

        res.send();
    } catch (err) {
        next(err);
    }
});

personnelRouter.get('/removal-types', async (req, res, next) => {
    try {
        res.json(await personnelService.getRemovalTypes());
    } catch (err) {
        next(err);
    }
});

export default personnelRouter;
