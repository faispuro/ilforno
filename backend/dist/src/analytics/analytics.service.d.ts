import { PrismaService } from '../prisma/prisma.service';
import { EventType } from './dto/track-event.dto';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    trackEvent(type: EventType): Promise<{
        id: string;
        createdAt: Date;
        type: string;
    }>;
    getDashboardMetrics(): Promise<{
        visitasTotales: number;
        pedirWhatsapp: number;
        menuActivo: number;
        tasaConversion: number;
    }>;
}
