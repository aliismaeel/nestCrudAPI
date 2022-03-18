import * as mongoose from "mongoose";
export declare const EmployeeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Employee {
    empId: string;
    empName: string;
    empSalary: number;
    empJobs: mongoose.Schema.Types.ObjectId[];
}
