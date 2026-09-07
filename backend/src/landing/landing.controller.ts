import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { LandingService } from './landing.service';
import { UpdateOficioDto } from './dto/update-oficio.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Get('oficio')
  getOficio() {
    return this.landingService.getOficio();
  }

  @UseGuards(JwtAuthGuard)
  @Put('oficio')
  updateOficio(@Body() dto: UpdateOficioDto) {
    return this.landingService.updateOficio(dto);
  }

  @Get('whatsapp')
  getWhatsapp() {
    return this.landingService.getWhatsapp();
  }

  @UseGuards(JwtAuthGuard)
  @Put('whatsapp')
  updateWhatsapp(@Body() dto: UpdateWhatsappDto) {
    return this.landingService.updateWhatsapp(dto);
  }
}