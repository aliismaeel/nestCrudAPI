import * as mongoose from 'mongoose';
export declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface User {
    userName: string;
    userEmail: string;
    userPassword: string;
}
export declare class UserDto {
    userEmail: string;
    userPassword: string;
}
export interface LoginResp {
    readonly token: string;
}