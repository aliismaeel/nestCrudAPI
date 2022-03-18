/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { Job } from './job.model';
export declare class JobService {
    private readonly JobModel;
    constructor(JobModel: Model<Job>);
    createJob(jobData: Job): Promise<Job>;
    getAllJobs(): Promise<(import("mongoose").Document<unknown, any, Job> & Job & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getJob(jobId: string): Promise<Job>;
    updateJob(jobId: string, updatedJob: Job): Promise<Job>;
    deleteJob(jobId: string): Promise<(import("mongoose").Document<unknown, any, Job> & Job & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
