import { Body, Controller, Delete, Get, Param, Post, Patch, Request, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Roles } from './roles.decorator';
import { User, UserDto, UserRole } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly CaslAbilityFactory: CaslAbilityFactory) { }

  @Post('signup')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() newUser: User): Promise<User> {
    return await this.userService.createUser(newUser);
  }

  // @Post('signup')
  // @Roles(UserRole.admin, UserRole.superAdmin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async createUser(@Req() req, @Body() newUser: User): Promise<User> {
  //   // const user = req.user;
  //   // const CaslAbilityFactory = this.CaslAbilityFactory.createForUser(user);
  //   return await this.userService.createUser(newUser);
  // }

  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id)
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('id') id: string, @Body() updatedUser: User): Promise<User> {
    return await this.userService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('login')
  async login(@Body() loginData:UserDto) {
    return await this.userService.login(loginData.userEmail, loginData.userPassword)
  }
  
}