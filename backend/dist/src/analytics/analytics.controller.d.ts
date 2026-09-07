import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    track(dto: TrackEventDto): Promise<{
        success: boolean;
    }>;
    getDashboard(): Promise<{
        visitasTotales: number;
        pedirWhatsapp: number;
        menuActivo: number;
        tasaConversion: number;
    }>;
}
