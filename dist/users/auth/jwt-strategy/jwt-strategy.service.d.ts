import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategyService_base: new (...args: any[]) => Strategy;
export declare class JwtStrategyService extends JwtStrategyService_base {
    private userService;
    constructor(userService: UsersService);
    validate(payloads: any): Promise<{
        userId: any;
        userName: any;
    }>;
}
export {};
