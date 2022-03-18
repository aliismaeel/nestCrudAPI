import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employees/employee.module'
import { JobModule } from './jobs/job.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, EmployeeModule, JobModule, MongooseModule.forRoot("mongodb+srv://aliismaeel:vokFWKKjfiAd9Rq0@nest-crduapi.ubxpw.mongodb.net/Nest-CrudAPI?retryWrites=true&w=majority"), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
