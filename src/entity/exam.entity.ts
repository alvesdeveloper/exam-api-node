import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { LaboratoryEntity } from './laboratory.entity';

@Entity('exam')
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(
    () => LaboratoryEntity,
    (laboratoryEntity) => laboratoryEntity.exams
  )
  laboratories: LaboratoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
