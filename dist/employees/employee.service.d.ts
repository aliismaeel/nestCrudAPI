/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Employee } from 'src/employees/employee.model';
import { Model } from "mongoose";
export declare class EmployeeService {
    private readonly EmployeeModel;
    constructor(EmployeeModel: Model<Employee>);
    createEmployee(employee: Employee): Promise<any>;
    getAllEmployees(): Promise<Omit<import("mongoose").Document<unknown, any, Employee> & Employee & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getEmployee(employeeId: string): Promise<Employee>;
    updateEmployee(employeeId: string, updatedEmployee: Employee): Promise<any>;
    deleteEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, any, Employee> & Employee & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getEmployeehavingJob(employeeId: string): Promise<import("mongoose").Document<unknown, any, Employee> & Employee & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
