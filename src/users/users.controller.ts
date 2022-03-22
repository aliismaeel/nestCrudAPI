import { Body, Controller, Delete, Get, Param, Post, Patch, Request, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '.././common/guards/roles.guard';
import { User, UserDto, UserRole } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  
  @Post('signup')
  async createUser(@Body() newUser: User): Promise<User> {
    return await this.userService.createUser(newUser);
  }

  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get('profile')
  @SetMetadata('roles', [UserRole.admin, UserRole.superAdmin])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async userProfile(@Request() req){
    console.log('From controller....')
    return req.user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updatedUser: User): Promise<User> {
    return await this.userService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('login')
  async login(@Body() loginData:UserDto) {
    return await this.userService.login(loginData.userEmail, loginData.userPassword)
  }
  
}
