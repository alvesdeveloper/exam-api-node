import { Router } from 'express';
import { ExamController } from '../controller/exam.controller';
import { ExamUpadateDto } from '../dtos/exam-update.dto';
import { ExamDto } from '../dtos/exam.dto';
import { validation } from '../validators/dto.validator';

export const examRoutes = Router();

const examController = new ExamController();

examRoutes.get('/exam', examController.getExamList);
examRoutes.get('/exam/:id', examController.getExamById);
examRoutes.post('/exam', validation(ExamDto), examController.create);
examRoutes.put('/exam/:id', validation(ExamUpadateDto), examController.update);
examRoutes.delete('/exam/:id', examController.remove);
examRoutes.post('/exam/lablist', examController.getLabListByExamName);
