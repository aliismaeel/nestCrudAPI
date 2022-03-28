import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategyService } from '../users/auth/jwt-strategy/jwt-strategy.service';
import { PasswordHasherService } from 'src/users/auth/password-hasher/password-hasher.service';
import { EmployeeSchema } from './employee.model';

import { EmployeeService } from './employee.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: "Employee", schema: EmployeeSchema}])],
  controllers: [EmployeesController],
  // providers: [EmployeeService, PasswordHasherService, JwtStrategyService]
  providers: [EmployeeService]
})
export class EmployeeModule{}