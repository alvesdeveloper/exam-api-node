import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { ExamEntity } from '../entity/exam.entity';

export class ExamController {
  async getExamList(req: Request, res: Response) {
    try {
      const exams = await getManager().find(ExamEntity, { isActive: true });
      return exams
        ? res.send(exams)
        : res.status(404).send({ result: 'Sorry, no data returned' });
    } catch (error) {
      res
        .status(400)
        .send({ error: 'The search returned no results: ' + error.message });
    }
  }

  async getExamById(req: Request, res: Response) {
    try {
      const exam = await getManager().findOne(ExamEntity, req.params.id);
      if (exam && !exam.isActive)
        return res.status(404).send({ result: 'The record is inactive' });

      return exam
        ? res.send(exam)
        : res.status(404).send({ result: 'Sorry, no data returned' });
    } catch (error) {
      res.status(400).send({
        error: 'Something wrong with the request: ' + error.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, type } = req.body;
      const examToSave = { name, type };

      const saveResult = await getManager().save(ExamEntity, examToSave);
      return res.send(saveResult);
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to save the data: ' + error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, type, isActive } = req.body;

      const exam = await getManager().findOne(ExamEntity, id);
      if (!exam) return res.status(404).send({ result: 'Id not found' });

      const examToSave = { name, type, isActive };

      const updateResult = await getManager().update(
        ExamEntity,
        exam.id,
        examToSave
      );

      return res.send({ affectedRecord: updateResult.affected });
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to update the data: ' + error.message,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const exam = await getManager().findOne(ExamEntity, id);
      if (!exam) return res.status(404).send({ result: 'Id not found' });

      await getManager().softRemove(ExamEntity, exam);

      return res.send({ result: 'The record has been removed' });
    } catch (error) {
      res.status(400).send({
        error: 'it was not possible to delete the data: ' + error.message,
      });
    }
  }

  async getLabListByExamName(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) throw new Error('must inform name for search');

      const exam = await getManager().findOne(ExamEntity, {
        where: { name: name, isActive: true },
        relations: ['laboratories'],
      });

      if (!exam) throw new Error('Exam not found!');

      const laboratories = exam.laboratories.map((lab) => {
        return {
          id: lab.id,
          name: lab.name,
          address: lab.address,
        };
      });

      return laboratories
        ? res.send(laboratories)
        : res.status(404).send({ result: 'Sorry, no data returned' });
    } catch (error) {
      res.status(400).send({
        error: 'Something wrong with the request: ' + error.message,
      });
    }
  }
}
