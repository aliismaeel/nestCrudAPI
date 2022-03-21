import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Strategy } from 'passport-jwt';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { jwtConstants } from './constants/jwt.constants';
import { userSchema } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: userSchema}]), JwtModule.register({secret:jwtConstants.secret})],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasherService, JwtStrategyService]
})
export class UsersModule {}
