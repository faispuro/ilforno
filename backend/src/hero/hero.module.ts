import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { LandingController } from './hero.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HeroService],
  controllers: [LandingController],
})
export class HeroModule {}