import { IsEnum } from 'class-validator';

export enum EventType {
  VISIT = 'VISIT',
  WHATSAPP_CLICK = 'WHATSAPP_CLICK',
}

export class TrackEventDto {
  @IsEnum(EventType, {
    message: 'El tipo de evento debe ser VISIT o WHATSAPP_CLICK',
  })
  type!: EventType;
}