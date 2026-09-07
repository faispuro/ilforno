import { LandingService } from './landing.service';
import { UpdateOficioDto } from './dto/update-oficio.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
export declare class LandingController {
    private readonly landingService;
    constructor(landingService: LandingService);
    getOficio(): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateOficio(dto: UpdateOficioDto): Promise<import("@prisma/client/runtime/library").JsonValue>;
    getWhatsapp(): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateWhatsapp(dto: UpdateWhatsappDto): Promise<import("@prisma/client/runtime/library").JsonValue>;
}
