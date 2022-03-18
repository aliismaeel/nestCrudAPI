/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { LoginResp, User } from './user.model';
import { Model } from 'mongoose';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private PasswordHasherService;
    private jwtService;
    constructor(userModel: Model<User>, PasswordHasherService: PasswordHasherService, jwtService: JwtService);
    createUser(newUser: User): Promise<any>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUser(userId: string): Promise<User>;
    updateUser(userId: string, updatedUser: User): Promise<User>;
    deleteUser(userId: string): Promise<(import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    login(email: any, password: any): Promise<LoginResp>;
}
