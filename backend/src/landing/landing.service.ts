import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOficioDto } from './dto/update-oficio.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

@Injectable()
export class LandingService {
  constructor(private readonly prisma: PrismaService) {}

  async getOficio() {
    const oficio = await this.prisma.landingSection.findUnique({
      where: { key: 'oficio' },
    });
    if (!oficio) {
      throw new NotFoundException('La sección Oficio no está configurada.');
    }
    return oficio.content;
  }

  async updateOficio(dto: UpdateOficioDto) {
    const updated = await this.prisma.landingSection.upsert({
      where: { key: 'oficio' },
      update: { content: dto as any },
      create: { key: 'oficio', content: dto as any },
    });
    return updated.content;
  }

  async getWhatsapp() {
    const whatsapp = await this.prisma.landingSection.findUnique({
      where: { key: 'whatsapp' },
    });
    if (!whatsapp) {
      throw new NotFoundException('El número de WhatsApp no está configurado.');
    }
    return whatsapp.content;
  }

  async updateWhatsapp(dto: UpdateWhatsappDto) {
    const updated = await this.prisma.landingSection.upsert({
      where: { key: 'whatsapp' },
      update: { content: dto as any },
      create: { key: 'whatsapp', content: dto as any },
    });
    return updated.content;
  }
}