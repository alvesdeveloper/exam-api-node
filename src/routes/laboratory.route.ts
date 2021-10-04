import { Router } from 'express';
import { LaboratoryController } from '../controller/laboratory.controller';
import { LaboratoryLinkExamDto } from '../dtos/laboratory-link-exam.dto';
import { LaboratoryUpadateDto } from '../dtos/laboratory-update.dto';
import { LaboratoryDto } from '../dtos/laboratory.dto';
import { validation } from '../validators/dto.validator';

export const laboratoryRoutes = Router();

const laboratoryController = new LaboratoryController();

laboratoryRoutes.get('/laboratory', laboratoryController.getLaboratoryList);
laboratoryRoutes.get('/laboratory/:id', laboratoryController.getLaboratoryById);

laboratoryRoutes.post(
  '/laboratory',
  validation(LaboratoryDto),
  laboratoryController.create
);

laboratoryRoutes.post(
  '/laboratory/link-exam',
  validation(LaboratoryLinkExamDto),
  laboratoryController.linkExam
);

laboratoryRoutes.put(
  '/laboratory/:id',
  validation(LaboratoryUpadateDto),
  laboratoryController.update
);

laboratoryRoutes.delete('/laboratory/:id', laboratoryController.remove);
