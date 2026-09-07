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
exports.PizzasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PizzasService = class PizzasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.pizza.findMany({
            orderBy: { orderNumber: 'asc' },
        });
    }
    async findOne(id) {
        const pizza = await this.prisma.pizza.findUnique({ where: { id } });
        if (!pizza) {
            throw new common_1.NotFoundException(`Pizza con ID ${id} no encontrada`);
        }
        return pizza;
    }
    async create(createPizzaDto) {
        return this.prisma.pizza.create({
            data: createPizzaDto,
        });
    }
    async update(id, updatePizzaDto) {
        await this.findOne(id);
        return this.prisma.pizza.update({
            where: { id },
            data: updatePizzaDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.pizza.delete({
            where: { id },
        });
    }
};
exports.PizzasService = PizzasService;
exports.PizzasService = PizzasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PizzasService);
//# sourceMappingURL=pizzas.service.js.map