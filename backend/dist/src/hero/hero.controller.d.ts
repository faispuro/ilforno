import { HeroService } from './hero.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
export declare class LandingController {
    private readonly landingService;
    constructor(landingService: HeroService);
    getHero(): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateHero(dto: UpdateHeroDto): Promise<import("@prisma/client/runtime/library").JsonValue>;
}
