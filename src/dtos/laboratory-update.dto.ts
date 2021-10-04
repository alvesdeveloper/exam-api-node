import { IsBoolean, IsDefined, IsNotEmpty } from 'class-validator';

export class LaboratoryUpadateDto {
  @IsDefined()
  @IsNotEmpty()
  public name: string;

  @IsDefined()
  @IsNotEmpty()
  public address: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;
}
