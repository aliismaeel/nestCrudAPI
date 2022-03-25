import * as mongoose from 'mongoose';

export enum UserRole {
  admin = "admin",
  superAdmin = "superAdmin"
}

export const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    enum:['admin', 'superadmin', 'user'],
    default:'user',
    required: true
  }
})

export interface User {
  userName: string,
  userEmail: string,
  userPassword: string,
  userRole: UserRole
}

export class UserDto {
  userEmail: string;
  userPassword: string;
}

export interface LoginResp {
  readonly token: string
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}