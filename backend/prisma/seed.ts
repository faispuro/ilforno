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
      name: 'Muzzarella Tradicional',
      price: 9500,
      description: 'Salsa de tomate casera, abundante muzzarella, aceitunas verdes y orégano.',
      tagBadge: 'RECOMENDADA',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
      available: true,
    },
    {
      orderNumber: 2,
      name: 'Fugazzeta Especial',
      price: 11000,
      description: 'Doble capa de muzzarella, cebolla caramelizada y orégano.',
      tagBadge: 'MÁS VENDIDA',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800',
      available: true,
    },
    {
      orderNumber: 3,
      name: 'Napolitana con Ajo',
      price: 11200,
      description: 'Tomate fresco, ajos dorados, aceitunas y orégano.',
      tagBadge: 'CLÁSICA',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800',
      available: true,
    },
    {
      orderNumber: 4,
      name: 'Calabresa a la Leña',
      price: 11800,
      description: 'Longaniza calabresa, muzzarella y ají molido al toque.',
      tagBadge: 'PICANTE',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800',
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

  const hero = {
    titleHighlight: 'La mejor pizza a la piedra',
    titleMain: 'que buscás está acá',
    badgeYears: 'MÁS DE 10 AÑOS',
    badgeText: 'compartiendo con vos',
    description:
      'Nuestra pizzería familiar se ha convertido en un referente de la ciudad, ofreciendo las mejores pizzas a la piedra elaboradas con harina seleccionada y fermentación lenta.',
    bgImage:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
  };

  await prisma.landingSection.upsert({
    where: { key: 'hero' },
    update: { content: hero },
    create: { key: 'hero', content: hero },
  });

  const oficio = {
    steps: [
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
    ],
  };

  await prisma.landingSection.upsert({
    where: { key: 'oficio' },
    update: { content: oficio },
    create: { key: 'oficio', content: oficio },
  });

  const whatsapp = { phone: '+54 9 341 555-0199' };

  await prisma.landingSection.upsert({
    where: { key: 'whatsapp' },
    update: { content: whatsapp },
    create: { key: 'whatsapp', content: whatsapp },
  });

  console.log('🧩 Contenido inicial de landing cargado en la base de datos.');
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