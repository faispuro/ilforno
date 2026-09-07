import { PrismaService } from '../prisma/prisma.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
export declare class HeroService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHero(): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateHero(dto: UpdateHeroDto): Promise<import("@prisma/client/runtime/library").JsonValue>;
}
