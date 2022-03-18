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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EmployeeService = class EmployeeService {
    constructor(EmployeeModel) {
        this.EmployeeModel = EmployeeModel;
    }
    async createEmployee(employee) {
        const newEmployee = new this.EmployeeModel(employee);
        const result = await newEmployee.save();
        return result.id;
    }
    async getAllEmployees() {
        return await this.EmployeeModel.find()
            .populate('empJobs', 'jobTitle jobResponsibilities');
    }
    async getEmployee(employeeId) {
        const employee = await this.EmployeeModel.findById({ _id: employeeId });
        if (!employee) {
            throw new common_1.NotFoundException();
        }
        return employee;
    }
    async updateEmployee(employeeId, updatedEmployee) {
        let employee = await this.EmployeeModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException();
        }
        employee.empName = updatedEmployee.empName;
        employee.empSalary = updatedEmployee.empSalary;
        employee.empJobs = updatedEmployee.empJobs;
        const result = await employee.save();
        return result;
    }
    async deleteEmployee(employeeId) {
        const employee = await this.EmployeeModel.findByIdAndRemove(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException();
        }
        return await this.EmployeeModel.find();
    }
    async getEmployeehavingJob(employeeId) {
        const employee = await this.EmployeeModel.findById(employeeId)
            .populate('empJobs', 'jobTitle jobResponsibilities -_id');
        if (!employee) {
            throw new common_1.NotFoundException();
        }
        return employee;
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Employee")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map