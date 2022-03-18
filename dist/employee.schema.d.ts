/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type EmployeeDocument = Employee & Document;
export declare class Employee {
    empId: string;
    empName: string;
    empSalary: number;
}
export declare const employeeSchema: import("mongoose").Schema<Document<Employee, any, any>, import("mongoose").Model<Document<Employee, any, any>, any, any, any>, any, any>;
