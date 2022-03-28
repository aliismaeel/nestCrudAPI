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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly CaslAbilityFactory: CaslAbilityFactory) { }

  // @Post('signup')
  // @Roles(UserRole.admin, UserRole.superAdmin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async createUser(@Body() newUser: User): Promise<User> {
  //   return await this.userService.createUser(newUser);
  // }

  @Post('signup')
  @CheckPermission({action: Action.Create, subject: User})
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async createUser(@Req() req, @Body() newUser: User): Promise<User> {
    const user = req.user;
    // const CaslAbilityFactory = this.CaslAbilityFactory.createForUser(user);
    // const allowed = CaslAbilityFactory.can(Action.Create, User);
    //   if(!allowed){
    //     throw new ForbiddenException('only admin can create new user!')
    //   }

      // try {
      //   ForbiddenError.from(CaslAbilityFactory)
      //   .setMessage('only admin can create...')
      //   .throwUnlessCan(Action.Create, User);
      //   return await this.userService.createUser(newUser);
      // } catch (error) {
      //   if(error instanceof ForbiddenError){
      //       throw new ForbiddenException(error.message)
      //   }
      // }
        return await this.userService.createUser(newUser);

  }

  @Get()
  @CheckPermission({action: Action.Read, subject: User})
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id)
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateUser(@Param('id') id: string, @Body() updatedUser: User): Promise<User> {
    return await this.userService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('login')
  async login(@Body() loginData:UserDto) {
    return await this.userService.login(loginData.userEmail, loginData.userPassword)
  }
  
}