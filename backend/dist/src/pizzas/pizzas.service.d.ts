import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
export declare class PizzasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: number;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        tagBadge: string | null;
        image: string;
        available: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: number;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        tagBadge: string | null;
        image: string;
        available: boolean;
    }>;
    create(createPizzaDto: CreatePizzaDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: number;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        tagBadge: string | null;
        image: string;
        available: boolean;
    }>;
    update(id: string, updatePizzaDto: UpdatePizzaDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: number;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        tagBadge: string | null;
        image: string;
        available: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: number;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        tagBadge: string | null;
        image: string;
        available: boolean;
    }>;
}
