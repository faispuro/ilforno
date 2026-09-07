import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando la carga de datos iniciales (Seed)...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ilfondo.com' },
    update: {},
    create: {
      email: 'admin@ilfondo.com',
      name: 'Admin Il Fondo',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`👤 Usuario Admin listo: ${admin.email}`);

  const pizzas = [
    {
      orderNumber: 1,
      name: 'Margherita Speciale',
      price: 12500,
      description: 'Salsa de tomate italiano, mozzarella fior di latte, albahaca fresca y aceite de oliva virgen extra.',
      tagBadge: 'CLÁSICA',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800',
      available: true,
    },
    {
      orderNumber: 2,
      name: 'Diavola Capricciosa',
      price: 14200,
      description: 'Salsa de tomate, mozzarella, salame picante tipo calabrés, ají molido y un toque de miel infusionada.',
      tagBadge: 'MÁS VENDIDA',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800',
      available: true,
    },
    {
      orderNumber: 3,
      name: 'Quattro Formaggi',
      price: 15000,
      description: 'Base blanca con mozzarella, gorgonzola cremoso, queso fontina y parmesano estacionado.',
      tagBadge: 'RECOMENDADA',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
      available: true,
    },
  ];

  for (const pizza of pizzas) {
    await prisma.pizza.upsert({
      where: { orderNumber: pizza.orderNumber },
      update: pizza,
      create: pizza,
    });
  }

  console.log('🍕 Pizzas iniciales creadas con éxito.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });