import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './employee.model';

import { EmployeeService } from './employee.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: "Employee", schema: EmployeeSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeeService]
})
export class EmployeeModule{}