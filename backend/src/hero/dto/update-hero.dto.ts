import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHeroDto {
  @IsString()
  @IsNotEmpty()
  titleHighlight!: string;

  @IsString()
  @IsNotEmpty()
  titleMain!: string;

  @IsString()
  @IsNotEmpty()
  badgeYears!: string;

  @IsString()
  @IsNotEmpty()
  badgeText!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsString()
  bgImage?: string | null;
}