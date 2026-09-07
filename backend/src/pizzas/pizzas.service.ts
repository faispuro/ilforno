import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.pizza.create({
      data: createPizzaDto,
    });
  }

  async update(id: string, updatePizzaDto: UpdatePizzaDto) {
    await this.findOne(id); // Verifica si existe
    return this.prisma.pizza.update({
      where: { id },
      data: updatePizzaDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica si existe
    return this.prisma.pizza.delete({
      where: { id },
    });
  }
}