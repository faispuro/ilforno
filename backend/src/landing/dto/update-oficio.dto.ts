import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ProcessStepDto {
  @IsString()
  @IsNotEmpty()
  step!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateOficioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProcessStepDto)
  steps!: ProcessStepDto[];
}