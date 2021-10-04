import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { EXAM_TYPE } from '../enums/exam-type.enum';

export class ExamDto {
  @IsDefined()
  @IsNotEmpty()
  public name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(EXAM_TYPE)
  public type: string;
}
