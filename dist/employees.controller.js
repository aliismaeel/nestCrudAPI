"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const employee_1 = require("./employee");
let employees = [
    { empId: '0', empName: 'ali', empSalary: 1000 },
    { empId: '1', empName: 'umair', empSalary: 2000 },
    { empId: '2', empName: 'rizwan', empSalary: 3000 },
    { empId: '3', empName: 'noman', empSalary: 4000 },
    { empId: '4', empName: 'john', empSalary: 5000 }
];
let EmployeesController = class EmployeesController {
    getAllEmployees() {
        return employees;
    }
    getEmployee(params) {
        if (params.id == employees[params.id].empId) {
            return employees[params.id];
        }
        return 'Please use the correct id...';
    }
    createEmployee(body) {
        console.log(`your new object: ${body.empId}`);
        if (!body) {
            return "your object is null, so please check...";
        }
        employees.push(body);
        return employees;
    }
    updateEmployee(id, body) {
        if (id === employees[id].empId && body !== null) {
            employees[id].empName = body.empName;
            employees[id].empSalary = body.empSalary;
            return employees[id];
        }
        return 'id is not present or Employee oject is null...';
    }
    deleteEmployee(id) {
        let employeeIndex = employees.indexOf(employees[id]);
        console.log(employeeIndex);
        console.log(employees[employeeIndex]);
        if (employeeIndex > 0) {
            employees.splice(employeeIndex, 1);
            return employees;
        }
        return 'Id is not present...';
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], EmployeesController.prototype, "getAllEmployees", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], EmployeesController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_1.Employee]),
    __metadata("design:returntype", Object)
], EmployeesController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_1.Employee]),
    __metadata("design:returntype", Object)
], EmployeesController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], EmployeesController.prototype, "deleteEmployee", null);
EmployeesController = __decorate([
    (0, common_1.Controller)('employees')
], EmployeesController);
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employees.controller.js.map