import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventType } from './dto/track-event.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async trackEvent(type: EventType) {
    return this.prisma.analyticsEvent.create({
      data: { type },
    });
  }

  async getDashboardMetrics() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const visitasTotales = await this.prisma.analyticsEvent.count({
      where: {
        type: EventType.VISIT,
        createdAt: { gte: startOfMonth },
      },
    });

    const pedirWhatsapp = await this.prisma.analyticsEvent.count({
      where: {
        type: EventType.WHATSAPP_CLICK,
        createdAt: { gte: startOfMonth },
      },
    });

    const menuActivo = await this.prisma.pizza.count({
      where: { available: true },
    });

    const tasaConversion =
      visitasTotales > 0
        ? Number(((pedirWhatsapp / visitasTotales) * 100).toFixed(1))
        : 0;

    return {
      visitasTotales,
      pedirWhatsapp,
      menuActivo,
      tasaConversion,
    };
  }
}