import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { ExamEntity } from '../entity/exam.entity';
import { LaboratoryEntity } from '../entity/laboratory.entity';
import { ExamService } from '../service/exam.service';
import { LaboratoryService } from '../service/laboratory.service';

export class LaboratoryController {
  async getLaboratoryList(req: Request, res: Response) {
    try {
      const laboratories = await getManager().find(LaboratoryEntity, {
        isActive: true,
      });
      return laboratories
        ? res.send(laboratories)
        : res.status(404).send({ result: 'Sorry, no data returned' });
    } catch (error) {
      res
        .status(400)
        .send({ error: 'The search returned no results: ' + error.message });
    }
  }

  async getLaboratoryById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const laboratory = await getManager().findOne(LaboratoryEntity, id, {
        relations: ['exams'],
      });
      if (laboratory && !laboratory.isActive)
        return res.status(404).send({ result: 'The record is inactive' });

      return laboratory
        ? res.send(laboratory)
        : res.status(404).send({ result: 'Sorry, no data returned' });
    } catch (error) {
      res.status(400).send({
        error: 'Something wrong with the request: ' + error.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, address } = req.body;
      const labToSave = { name, address };

      const saveResult = await getManager().save(LaboratoryEntity, labToSave);
      res.send(saveResult);
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to save the data: ' + error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name, address, isActive } = req.body;

      const laboratory = await getManager().findOne(LaboratoryEntity, id);
      if (!laboratory) return res.status(404).send({ result: 'Id not found' });

      const labToSave = { name, address, isActive };

      const updateResult = await getManager().update(
        LaboratoryEntity,
        laboratory.id,
        labToSave
      );

      res.send({ affectedRecord: updateResult.affected });
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to update the data: ' + error.message,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const laboratory = await getManager().findOne(LaboratoryEntity, id);
      if (!laboratory) return res.status(404).send({ result: 'Id not found' });

      await getManager().softRemove(LaboratoryEntity, laboratory);
      res.send({ result: 'The record has been removed' });
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to delete the data: ' + error.message,
      });
    }
  }

  async linkExam(req: Request, res: Response) {
    try {
      const { labName, examList } = req.body;

      const laboratory = await LaboratoryService.checkLaboratoryByName(labName);
      const exams = await ExamService.checkExamList(examList);

      laboratory.exams = exams;
      const saveResult = await getManager().save(LaboratoryEntity, laboratory);

      res.send(saveResult);
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to save the data: ' + error.message,
      });
    }
  }
}
