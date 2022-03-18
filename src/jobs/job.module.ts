import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { jobSchema } from './job.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Job', schema: jobSchema }])],
  controllers: [JobsController],
  providers: [JobService]
})
export class JobModule { }