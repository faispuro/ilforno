import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateHeroDto {
  @IsString()
  @IsNotEmpty()
  backgroundImage!: string;

  @IsString()
  @IsNotEmpty()
  highlightTitle!: string;

  @IsString()
  @IsNotEmpty()
  secondaryTitle!: string;

  @IsString()
  @IsNotEmpty()
  badgeYears!: string;

  @IsString()
  @IsNotEmpty()
  badgeSubtext!: string;

  @IsString()
  @IsNotEmpty()
  briefDescription!: string;
}