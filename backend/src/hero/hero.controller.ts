import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { HeroService } from './hero.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: HeroService) {}

  @Get('hero')
  getHero() {
    return this.landingService.getHero();
  }

  @UseGuards(JwtAuthGuard)
  @Put('hero')
  updateHero(@Body() dto: UpdateHeroDto) {
    return this.landingService.updateHero(dto);
  }
}