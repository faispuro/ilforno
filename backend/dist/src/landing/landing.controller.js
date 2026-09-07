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
exports.LandingController = void 0;
const common_1 = require("@nestjs/common");
const landing_service_1 = require("./landing.service");
const update_oficio_dto_1 = require("./dto/update-oficio.dto");
const update_whatsapp_dto_1 = require("./dto/update-whatsapp.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LandingController = class LandingController {
    landingService;
    constructor(landingService) {
        this.landingService = landingService;
    }
    getOficio() {
        return this.landingService.getOficio();
    }
    updateOficio(dto) {
        return this.landingService.updateOficio(dto);
    }
    getWhatsapp() {
        return this.landingService.getWhatsapp();
    }
    updateWhatsapp(dto) {
        return this.landingService.updateWhatsapp(dto);
    }
};
exports.LandingController = LandingController;
__decorate([
    (0, common_1.Get)('oficio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandingController.prototype, "getOficio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('oficio'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_oficio_dto_1.UpdateOficioDto]),
    __metadata("design:returntype", void 0)
], LandingController.prototype, "updateOficio", null);
__decorate([
    (0, common_1.Get)('whatsapp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandingController.prototype, "getWhatsapp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('whatsapp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_whatsapp_dto_1.UpdateWhatsappDto]),
    __metadata("design:returntype", void 0)
], LandingController.prototype, "updateWhatsapp", null);
exports.LandingController = LandingController = __decorate([
    (0, common_1.Controller)('landing'),
    __metadata("design:paramtypes", [landing_service_1.LandingService])
], LandingController);
//# sourceMappingURL=landing.controller.js.map