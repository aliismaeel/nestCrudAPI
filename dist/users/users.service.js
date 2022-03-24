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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const password_hasher_service_1 = require("./auth/password-hasher/password-hasher.service");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, PasswordHasherService, jwtService) {
        this.userModel = userModel;
        this.PasswordHasherService = PasswordHasherService;
        this.jwtService = jwtService;
    }
    async createUser(newUser) {
        let user = await this.userModel.findOne({ userEmail: newUser.userEmail });
        if (user) {
            throw new common_1.UnauthorizedException(`User already exists with this ${newUser.userEmail} id...`);
        }
        newUser.userPassword = await this.PasswordHasherService.passwordHash(newUser.userPassword);
        user = new this.userModel((0, lodash_1.pick)(newUser, ['userName', 'userEmail', 'userPassword', 'userRole']));
        await user.save();
        const result = (0, lodash_1.pick)(user, ["_id", "userName", "userEmail", "userRole"]);
        return result;
    }
    async getAllUsers() {
        return await this.userModel.find();
    }
    async getUser(userId) {
        const user = await this.userModel.findById({ _id: userId });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async updateUser(userId, updatedUser) {
        let user = await this.userModel.findById({ _id: userId });
        if (!user) {
            throw new Error("User does not exist in database");
        }
        if (updatedUser.userName) {
            user.userName = updatedUser.userName;
        }
        if (updatedUser.userEmail) {
            user.userEmail = updatedUser.userEmail;
        }
        if (updatedUser.userPassword) {
            user.userPassword = updatedUser.userPassword;
        }
        const result = await user.save();
        return result;
    }
    async deleteUser(userId) {
        const user = await this.userModel.findByIdAndRemove(userId);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return await this.userModel.find();
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ userEmail: email });
        if (!user) {
            throw new common_1.UnauthorizedException('this email does not exist');
        }
        const result = await this.PasswordHasherService.comparePassword(password, user.userPassword);
        const token = await this.jwtService.signAsync({
            userEmail: user.userEmail,
            userName: user.userName,
            userRole: user.userRole
        }, {
            expiresIn: '1d',
        });
        if (result) {
            return { token };
        }
        else {
            throw new common_1.UnauthorizedException('invalid password');
        }
    }
    async isValidateByUser(payloads) {
        const foundUser = await this.userModel.findOne({ userEmail: payloads.userEmail });
        if (foundUser) {
            return true;
        }
        else {
            return false;
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model, password_hasher_service_1.PasswordHasherService,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map