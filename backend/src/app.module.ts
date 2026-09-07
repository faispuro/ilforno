import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { HeroModule } from './hero/hero.module';
import { LandingModule } from './landing/landing.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    PizzasModule, 
    HeroModule, 
    LandingModule,
    AnalyticsModule, 
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}