import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(private readonly prisma: PrismaService) {}

  async getHero() {
    const hero = await this.prisma.landingSection.findUnique({
      where: { key: 'hero' },
    });
    if (!hero) {
      throw new NotFoundException('La sección Hero no está configurada.');
    }
    return hero.content;
  }

  async updateHero(dto: UpdateHeroDto) {
    const updated = await this.prisma.landingSection.upsert({
      where: { key: 'hero' },
      update: { content: dto as any },
      create: { key: 'hero', content: dto as any },
    });
    return updated.content;
  }
}