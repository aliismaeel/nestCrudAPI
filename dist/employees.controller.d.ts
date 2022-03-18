import { Employee } from './employee';
export declare class EmployeesController {
    getAllEmployees(): Employee[];
    getEmployee(params: any): (Employee | string);
    createEmployee(body: Employee): (Employee[] | string);
    updateEmployee(id: string, body: Employee): (Employee | string);
    deleteEmployee(id: string): (Array<Employee> | string);
}
