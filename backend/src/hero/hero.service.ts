import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateHeroDto } from './dto/update-hero.dto';

const defaultHero = {
  titleHighlight: 'La mejor pizza a la piedra',
  titleMain: 'que buscás está acá',
  badgeYears: 'MÁS DE 10 AÑOS',
  badgeText: 'compartiendo con vos',
  description:
    'Nuestra pizzería familiar se ha convertido en un referente de la ciudad, ofreciendo las mejores pizzas a la piedra elaboradas con harina seleccionada y fermentación lenta.',
  bgImage:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
};

@Injectable()
export class HeroService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeHero(content: any) {
    if (!content || typeof content !== 'object') {
      return defaultHero;
    }

    return {
      ...defaultHero,
      ...content,
      titleHighlight: content.titleHighlight ?? defaultHero.titleHighlight,
      titleMain: content.titleMain ?? defaultHero.titleMain,
      badgeYears: content.badgeYears ?? defaultHero.badgeYears,
      badgeText: content.badgeText ?? defaultHero.badgeText,
      description: content.description ?? defaultHero.description,
      bgImage: content.bgImage ?? defaultHero.bgImage,
    };
  }

  async getHero() {
    const hero = await this.prisma.landingSection.findUnique({
      where: { key: 'hero' },
    });

    return this.normalizeHero(hero?.content ?? defaultHero);
  }

  async updateHero(dto: UpdateHeroDto) {
    const payload = this.normalizeHero(dto as any);
    const updated = await this.prisma.landingSection.upsert({
      where: { key: 'hero' },
      update: { content: payload as any },
      create: { key: 'hero', content: payload as any },
    });
    return this.normalizeHero(updated.content);
  }
}