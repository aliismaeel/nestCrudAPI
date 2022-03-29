import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { EmployeeSchema } from './employee.model';

import { EmployeeService } from './employee.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{name: "Employee", schema: EmployeeSchema}]),
    CaslModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeeService]
})
export class EmployeeModule{}