import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './job.model';

@Injectable()
export class JobService{
  constructor(@InjectModel('Job') private readonly JobModel: Model<Job>) { }
  async createJob(jobData: Job) : Promise<Job> {
    if (!jobData) {
      throw new NotFoundException();
    }

    const job = new this.JobModel(jobData);
    const result = await job.save();
    return result.id;
  }

  async getAllJobs() {
    return await this.JobModel.find();
  }

  async getJob(jobId: string): Promise<Job> {
    const job = await this.JobModel.findById({ _id: jobId });
    if (!job) {
      throw new NotFoundException();
    }

    return job;
  }

  async updateJob(jobId: string, updatedJob: Job): Promise<Job> {
    let job = await this.JobModel.findById({ _id: jobId });
    if (!job) {
      throw new NotFoundException();
    }
    
    job.jobTitle = updatedJob.jobTitle;
    job.jobResponsibilities = updatedJob.jobResponsibilities;
    const result = await job.save();
    return result;
  }

  async deleteJob(jobId: string) {
    const job = await this.JobModel.findByIdAndRemove(jobId);
    if (!job) {
      throw new NotFoundException();
    }

    return await this.JobModel.find();
  }

  // async updateJobData(job: Job, updatedJobData: Job): Promise<Job> {
  //   job.jobTitle = updatedJobData.jobTitle;
  //   job.jobResponsibilities = updatedJobData.jobResponsibilities;
  //   const result = await job.save();
  //   return result;
  // }
}