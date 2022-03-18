import * as mongoose from 'mongoose';
export declare const jobSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Job {
    jobId: string;
    jobTitle: string;
    jobResponsibilities: string;
}
