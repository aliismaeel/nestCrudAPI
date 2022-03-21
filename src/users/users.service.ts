import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginResp, User } from './user.model';
import { Model } from 'mongoose';
import { pick } from 'lodash';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>, private PasswordHasherService: PasswordHasherService,
    private jwtService: JwtService) { }

  async createUser(newUser: User): Promise<any>{
    let user = await this.userModel.findOne({ userEmail: newUser.userEmail });
    if (user) {
      throw new UnauthorizedException(`User already exists with this ${newUser.userEmail} id...`);
    }

    newUser.userPassword = await this.PasswordHasherService.passwordHash(newUser.userPassword);

    user = new this.userModel(pick(newUser, ['userName', 'userEmail', 'userPassword']));
    await user.save();
    const result = pick(user, ["_id", "userName", "userEmail"]);
    return result;
  }

  async getAllUsers() {
    return await this.userModel.find();
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userModel.findById({ _id: userId });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async updateUser(userId: string, updatedUser: User): Promise<User> {
    let user = await this.userModel.findById({ _id: userId });
    if (!user) {
      throw new Error("User does not exist in database");
    }
    if (updatedUser.userName) {
      user.userName = updatedUser.userName
    }
    if (updatedUser.userEmail) {
      user.userEmail = updatedUser.userEmail
    }
    if (updatedUser.userPassword) {
      user.userPassword = updatedUser.userPassword
    }
    const result = await user.save();
    return result;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndRemove(userId);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.userModel.find();
  }

  async login(email, password): Promise<LoginResp> {
    const user = await this.userModel.findOne({ userEmail: email });
    if (!user) {
      throw new UnauthorizedException('this email does not exist');
    }

    const result = await this.PasswordHasherService.comparePassword(password, user.userPassword);
    const token = await this.jwtService.signAsync(
      { 
        userEmail: user.userEmail,
        userName: user.userName 
      },
      {
        expiresIn: '1d',
      });
    if (result) {
      return { token }
    } else {
      throw new UnauthorizedException('invalid password');
    }
  }

  async isValidateByUser(payloads: any) {
    console.log('From UserService...')
    const foundUser = await this.userModel.findOne({userEmail: payloads.userEmail});
    if(foundUser){
       return true;
    }
    else{
      return false;
    }
  }
}
