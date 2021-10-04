import { getManager } from 'typeorm';
import { ExamEntity } from '../entity/exam.entity';

export class ExamService {
  static async checkExamList(examList: string[]): Promise<ExamEntity[]> {
    const exams = [];
    for (const name of examList) {
      const exam = await getManager().findOne(ExamEntity, {
        name,
        isActive: true,
      });
      if (!exam) throw new Error('Exam not found: ' + name);
      exams.push(exam);
    }
    return exams;
  }
}
