"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LandingService = class LandingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOficio() {
        const oficio = await this.prisma.landingSection.findUnique({
            where: { key: 'oficio' },
        });
        if (!oficio) {
            throw new common_1.NotFoundException('La sección Oficio no está configurada.');
        }
        return oficio.content;
    }
    async updateOficio(dto) {
        const updated = await this.prisma.landingSection.upsert({
            where: { key: 'oficio' },
            update: { content: dto },
            create: { key: 'oficio', content: dto },
        });
        return updated.content;
    }
    async getWhatsapp() {
        const whatsapp = await this.prisma.landingSection.findUnique({
            where: { key: 'whatsapp' },
        });
        if (!whatsapp) {
            throw new common_1.NotFoundException('El número de WhatsApp no está configurado.');
        }
        return whatsapp.content;
    }
    async updateWhatsapp(dto) {
        const updated = await this.prisma.landingSection.upsert({
            where: { key: 'whatsapp' },
            update: { content: dto },
            create: { key: 'whatsapp', content: dto },
        });
        return updated.content;
    }
};
exports.LandingService = LandingService;
exports.LandingService = LandingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LandingService);
//# sourceMappingURL=landing.service.js.map