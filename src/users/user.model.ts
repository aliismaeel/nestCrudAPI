import * as mongoose from 'mongoose';

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
  }
})

export interface User {
  userName: string,
  userEmail: string,
  userPassword: string
}

export class UserDto {
  userEmail: string;
  userPassword: string
}

export interface LoginResp {
  readonly token: string
}