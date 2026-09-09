import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
  constructor(private readonly prisma: PrismaService) {}

  private handleUniqueError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const targets = Array.isArray(error.meta?.target) ? error.meta.target : [error.meta?.target];
      const fields = targets.filter(Boolean).join(', ');
      throw new ConflictException(
        `Ya existe una pizza con ese valor de ${fields || 'campo único'}. Cambiá el nombre o el número de orden.`
      );
    }

    throw error;
  }

  async findAll() {
    return this.prisma.pizza.findMany({
      orderBy: { orderNumber: 'asc' },
    });
  }

  async findOne(id: string) {
    const pizza = await this.prisma.pizza.findUnique({ where: { id } });
    if (!pizza) {
      throw new NotFoundException(`Pizza con ID ${id} no encontrada`);
    }
    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto) {
    try {
      return await this.prisma.pizza.create({
        data: createPizzaDto,
      });
    } catch (error) {
      this.handleUniqueError(error);
    }
  }

  async update(id: string, updatePizzaDto: UpdatePizzaDto) {
    await this.findOne(id);

    const { orderNumber, ...safeData } = updatePizzaDto;

    try {
      return await this.prisma.pizza.update({
        where: { id },
        data: safeData,
      });
    } catch (error) {
      this.handleUniqueError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.pizza.delete({
      where: { id },
    });
  }
}