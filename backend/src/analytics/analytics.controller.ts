import { Controller, Post, Get, Body } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async track(@Body() dto: TrackEventDto) {
    await this.analyticsService.trackEvent(dto.type);
    return { success: true };
  }

  @Get('dashboard')
  async getDashboard() {
    return this.analyticsService.getDashboardMetrics();
  }
}