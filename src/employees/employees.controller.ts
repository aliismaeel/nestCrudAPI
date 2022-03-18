import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeesController{
  constructor(private employeeService: EmployeeService) { };

  @Post()
  async createEmployee(@Body() employee: Employee){
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
  async updateEmployee(@Param('id') id: string, @Body() updatedEmployee: Employee): Promise<Employee> {
    return await this.employeeService.updateEmployee(id, updatedEmployee);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string){
    return await this.employeeService.deleteEmployee(id);
  }
}