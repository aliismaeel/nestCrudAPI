import { Ability, ForbiddenError, subject } from '@casl/ability';
import { Body, Controller, Delete, Get, Param, Post, Patch, Request, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckPermission } from 'src/casl/abilities.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AbilitiesGuard } from 'src/common/guards/abilities.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from './roles.decorator';
import { Action, User, UserDto, UserRole } from './user.model';
import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly userService: UsersService, private readonly CaslAbilityFactory: CaslAbilityFactory) { }

//   // @Post('signup')
//   // @Roles(UserRole.admin, UserRole.superAdmin)
//   // @UseGuards(AuthGuard('jwt'), RolesGuard)
//   // async createUser(@Body() newUser: User): Promise<User> {
//   //   return await this.userService.createUser(newUser);
//   // }

//   @Get()
//   async getAllUser() {
//     return await this.userService.getAllUsers();
//   }

//   @Get(':id')
//   async getUser(@Param('id') id: string): Promise<User> {
//     return await this.userService.getUser(id)
//   }

//   @Patch(':id')
//   @Roles(UserRole.admin, UserRole.superAdmin)
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   async updateUser(@Param('id') id: string, @Body() updatedUser: User): Promise<User> {
//     return await this.userService.updateUser(id, updatedUser);
//   }

//   @Delete(':id')
//   @Roles(UserRole.admin, UserRole.superAdmin)
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   async deleteUser(@Param('id') id: string) {
//     return await this.userService.deleteUser(id);
//   }

//   @Post('login')
//   async login(@Body() loginData:UserDto) {
//     return await this.userService.login(loginData.userEmail, loginData.userPassword)
//   }
  
// }

//Authorization with CASL
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly CaslAbilityFactory: CaslAbilityFactory) { }

  @Post('signup')
  @CheckPermission({action: Action.Create, subject: User})
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async createUser(@Body() newUser: User): Promise<User> {
        return await this.userService.createUser(newUser);
  }

  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id)
  }

  @Patch(':id')
  @CheckPermission({action:Action.Update, subject:User})
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async updateUser(@Param('id') id: string, @Body() updatedUser: User): Promise<User> {
    return await this.userService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  @CheckPermission({action:Action.Delete, subject:User})
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('login')
  async login(@Body() loginData:UserDto) {
    return await this.userService.login(loginData.userEmail, loginData.userPassword)
  }
  
}


