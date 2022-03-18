/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Job } from './job.model';
import { JobService } from './job.service';
export declare class JobsController {
    private jobService;
    constructor(jobService: JobService);
    createJob(job: Job): Promise<{
        id: Job;
    }>;
    getAllJobs(): Promise<(import("mongoose").Document<unknown, any, Job> & Job & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getJob(id: string): Promise<Job>;
    updateJob(id: string, updatedJob: Job): Promise<Job>;
    deletejob(id: string): Promise<(import("mongoose").Document<unknown, any, Job> & Job & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
