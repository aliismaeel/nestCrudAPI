/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
export declare class EmployeesController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    createEmployee(employee: Employee): Promise<{
        id: any;
    }>;
    getAllProducts(): Promise<Omit<import("mongoose").Document<unknown, any, Employee> & Employee & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getEmployeeHavingJob(id: string): Promise<Employee>;
    updateEmployee(id: string, updatedEmployee: Employee): Promise<Employee>;
    deleteEmployee(id: string): Promise<(import("mongoose").Document<unknown, any, Employee> & Employee & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
