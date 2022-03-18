import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from 'src/employees/employee.model';
import { Model } from "mongoose"

@Injectable()
export class EmployeeService{
  constructor(@InjectModel("Employee") private readonly EmployeeModel: Model<Employee>) { }
  
  async createEmployee(employee: Employee){
    const newEmployee = new this.EmployeeModel(employee);
    const result = await newEmployee.save();
    return result.id;
  }

  async getAllEmployees(){
    return await this.EmployeeModel.find()
      .populate('empJobs', 'jobTitle jobResponsibilities');
  }

  async getEmployee(employeeId: string): Promise<Employee>{
    const employee = await this.EmployeeModel.findById({ _id: employeeId });
    if (!employee) {
      throw new NotFoundException();
    }

    return employee;
  }

  async updateEmployee(employeeId: string, updatedEmployee: Employee): Promise<any>{
    let employee = await this.EmployeeModel.findById(employeeId);
    
    if (!employee) {
      throw new NotFoundException();
    }
    
    employee.empName = updatedEmployee.empName;
    employee.empSalary = updatedEmployee.empSalary;
    employee.empJobs = updatedEmployee.empJobs;
    
    const result = await employee.save();
    return result;
  }

  async deleteEmployee(employeeId: string){
    const employee = await this.EmployeeModel.findByIdAndRemove(employeeId);    
    if (!employee) {
      throw new NotFoundException();
    }
    return await this.EmployeeModel.find();
  }

  //For relationship mean employee can have job
  async getEmployeehavingJob(employeeId: string) {
    const employee = await this.EmployeeModel.findById(employeeId)
      .populate('empJobs', 'jobTitle jobResponsibilities -_id');
    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }
}