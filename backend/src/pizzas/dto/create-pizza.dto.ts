import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreatePizzaDto {
  @IsInt()
  @Min(1)
  orderNumber!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  tagBadge?: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}