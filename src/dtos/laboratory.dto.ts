import { IsDefined, IsNotEmpty } from 'class-validator';

export class LaboratoryDto {
  @IsDefined()
  @IsNotEmpty()
  public name: string;

  @IsDefined()
  @IsNotEmpty()
  public address: string;
}
