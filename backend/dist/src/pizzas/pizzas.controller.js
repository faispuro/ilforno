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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzasController = void 0;
const common_1 = require("@nestjs/common");
const pizzas_service_1 = require("./pizzas.service");
const create_pizza_dto_1 = require("./dto/create-pizza.dto");
const update_pizza_dto_1 = require("./dto/update-pizza.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PizzasController = class PizzasController {
    pizzasService;
    constructor(pizzasService) {
        this.pizzasService = pizzasService;
    }
    findAll() {
        return this.pizzasService.findAll();
    }
    findOne(id) {
        return this.pizzasService.findOne(id);
    }
    create(createPizzaDto) {
        return this.pizzasService.create(createPizzaDto);
    }
    update(id, updatePizzaDto) {
        return this.pizzasService.update(id, updatePizzaDto);
    }
    remove(id) {
        return this.pizzasService.remove(id);
    }
};
exports.PizzasController = PizzasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PizzasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PizzasController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pizza_dto_1.CreatePizzaDto]),
    __metadata("design:returntype", void 0)
], PizzasController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pizza_dto_1.UpdatePizzaDto]),
    __metadata("design:returntype", void 0)
], PizzasController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PizzasController.prototype, "remove", null);
exports.PizzasController = PizzasController = __decorate([
    (0, common_1.Controller)('pizzas'),
    __metadata("design:paramtypes", [pizzas_service_1.PizzasService])
], PizzasController);
//# sourceMappingURL=pizzas.controller.js.map