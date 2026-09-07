import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ProcessStepDto {
  @IsString()
  @IsNotEmpty()
  step!: string; // ej: "001", "002"

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;
}

export class UpdateOficioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProcessStepDto)
  steps!: ProcessStepDto[];
}