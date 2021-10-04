import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { EXAM_TYPE } from '../enums/exam-type.enum';

export class ExamUpadateDto {
  @IsDefined()
  @IsNotEmpty()
  public name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(EXAM_TYPE)
  public type: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;
}
