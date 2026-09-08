import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOficioDto } from './dto/update-oficio.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

const defaultSteps = [
  {
    step: '01',
    title: '48 HORAS · MASA Y LEUDADO',
    desc: 'Fermentación lenta en frío para lograr una masa liviana.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },
  {
    step: '02',
    title: '100% ARTESANAL · INGREDIENTES FRESCOS',
    desc: 'Muzzarella de primera marca y salsa casera.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
  },
  {
    step: '03',
    title: 'PRE-COCCIÓN · GOLPE DE HORNO',
    desc: 'Base cocida a alta temperatura.',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212',
  },
  {
    step: '04',
    title: 'LISTAS PARA HOY · DIRECTO A TU HORNO',
    desc: 'Las guardás en el freezer y listas en minutos.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  },
];

@Injectable()
export class LandingService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeSteps(content: any) {
    if (Array.isArray(content)) return content;
    if (content && Array.isArray(content.steps)) return content.steps;
    return defaultSteps;
  }

  private normalizePhone(content: any) {
    if (content && typeof content === 'object') {
      const phone = content.phone ?? content.phoneNumber ?? content.number ?? '+54 9 341 555-0199';
      return phone;
    }
    return content ?? '+54 9 341 555-0199';
  }

  async getOficio() {
    const oficio = await this.prisma.landingSection.findUnique({
      where: { key: 'oficio' },
    });

    return { steps: this.normalizeSteps(oficio?.content ?? defaultSteps) };
  }

  async updateOficio(dto: UpdateOficioDto) {
    const normalizedSteps = Array.isArray((dto as any)?.steps)
      ? (dto as any).steps.map((step: any) => ({
          ...step,
          desc: step?.desc ?? step?.description ?? '',
          description: step?.description ?? step?.desc ?? '',
        }))
      : defaultSteps;

    const payload = { steps: normalizedSteps };
    const updated = await this.prisma.landingSection.upsert({
      where: { key: 'oficio' },
      update: { content: payload as any },
      create: { key: 'oficio', content: payload as any },
    });
    return { steps: this.normalizeSteps(updated.content) };
  }

  async getWhatsapp() {
    const whatsapp = await this.prisma.landingSection.findUnique({
      where: { key: 'whatsapp' },
    });

    return { phone: this.normalizePhone(whatsapp?.content ?? '+54 9 341 555-0199') };
  }

  async updateWhatsapp(dto: UpdateWhatsappDto) {
    const payload = { phone: dto?.phoneNumber ?? '+54 9 341 555-0199' };
    const updated = await this.prisma.landingSection.upsert({
      where: { key: 'whatsapp' },
      update: { content: payload as any },
      create: { key: 'whatsapp', content: payload as any },
    });
    return { phone: this.normalizePhone(updated.content) };
  }
}