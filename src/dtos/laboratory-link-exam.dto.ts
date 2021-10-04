import {
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDefined,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class LaboratoryLinkExamDto {
  @IsDefined()
  @IsNotEmpty()
  public labName: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ArrayMinSize(1)
  @MinLength(3, {
    each: true,
  })
  examList: string[];
}
