"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
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
//# sourceMappingURL=seed.js.map