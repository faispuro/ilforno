import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateWhatsappDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9\s-]+$/, {
    message: 'El número de teléfono debe ser un formato válido.',
  })
  phoneNumber!: string;
}