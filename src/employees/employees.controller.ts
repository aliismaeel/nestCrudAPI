import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/users/roles.decorator';
import { UserRole } from 'src/users/user.model';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeesController{
  constructor(private employeeService: EmployeeService) { };

  @Post()
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createEmployee(@Body() employee: Employee){
    console.log('calling from post method of employee...');
    const generatedId = await this.employeeService.createEmployee(employee);
    return { id: generatedId };
  }

  @Get()
  async getAllProducts(){
    return await this.employeeService.getAllEmployees();
  }

  // @Get(':id')
  // async getEmployee(@Param('id') id: string): Promise<Employee>{
  //   return await this.employeeService.getEmployee(id)
  // }

  @Get(':id')
  async getEmployeeHavingJob(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployeehavingJob(id)
  }

  @Put(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateEmployee(@Param('id') id: string, @Body() updatedEmployee: Employee): Promise<Employee> {
    return await this.employeeService.updateEmployee(id, updatedEmployee);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteEmployee(@Param('id') id: string){
    return await this.employeeService.deleteEmployee(id);
  }
}