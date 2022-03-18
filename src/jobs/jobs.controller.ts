import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Employee } from 'src/employees/employee.model';
import { Job } from './job.model';
import { JobService } from './job.service';

@Controller('jobs')
export class JobsController{
  constructor(private jobService: JobService) { }

  @Post()
  async createJob(@Body() job: Job) {
    const generatedId = await this.jobService.createJob(job);
    return { id: generatedId };
  }

  @Get()
  async getAllJobs() {
    return await this.jobService.getAllJobs();
  }

  @Get(':id')
  async getJob(@Param('id') id: string): Promise<Job> {
    return await this.jobService.getJob(id)
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() updatedJob: Job): Promise<Job> {
    return await this.jobService.updateJob(id, updatedJob);
  }

  @Delete(':id')
  async deletejob(@Param('id') id: string) {
    return await this.jobService.deleteJob(id);
  }
}