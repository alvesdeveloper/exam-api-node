import { getManager } from 'typeorm';
import { LaboratoryEntity } from '../entity/laboratory.entity';

export class LaboratoryService {
  static async checkLaboratoryByName(name: string): Promise<LaboratoryEntity> {
    const laboratory = await getManager().findOne(LaboratoryEntity, {
      name,
      isActive: true,
    });

    if (!laboratory) throw new Error('Laboratory not found: ' + name);
    return laboratory;
  }
}
