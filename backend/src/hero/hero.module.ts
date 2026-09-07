import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { LandingController } from './hero.controller';

@Module({
  providers: [HeroService],
  controllers: [LandingController]
})
export class HeroModule {}
