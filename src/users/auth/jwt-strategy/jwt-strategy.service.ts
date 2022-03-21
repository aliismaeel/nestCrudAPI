import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from '../../constants/jwt.constants';

@Injectable()
export class JwtStrategyService extends PassportStrategy (Strategy)
{
    constructor(private userService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payloads: any){
        console.log('Jwt strategy service...');
        const isValidate = this.userService.isValidateByUser(payloads);
        if(isValidate){
            return { userId: payloads.userEmail, userName: payloads.userName };
        }
        else{
            throw new UnauthorizedException('invalid credentials'):
        }
    }
} 
