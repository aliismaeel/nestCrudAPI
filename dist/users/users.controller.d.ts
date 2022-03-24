/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { User, UserDto } from './user.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(newUser: User): Promise<User>;
    getAllUser(): Promise<(import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUser(id: string): Promise<User>;
    updateUser(id: string, updatedUser: User): Promise<User>;
    deleteUser(id: string): Promise<(import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    login(loginData: UserDto): Promise<import("./user.model").LoginResp>;
}
