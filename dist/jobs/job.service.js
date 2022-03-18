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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let JobService = class JobService {
    constructor(JobModel) {
        this.JobModel = JobModel;
    }
    async createJob(jobData) {
        if (!jobData) {
            throw new common_1.NotFoundException();
        }
        const job = new this.JobModel(jobData);
        const result = await job.save();
        return result.id;
    }
    async getAllJobs() {
        return await this.JobModel.find();
    }
    async getJob(jobId) {
        const job = await this.JobModel.findById({ _id: jobId });
        if (!job) {
            throw new common_1.NotFoundException();
        }
        return job;
    }
    async updateJob(jobId, updatedJob) {
        let job = await this.JobModel.findById({ _id: jobId });
        if (!job) {
            throw new common_1.NotFoundException();
        }
        job.jobTitle = updatedJob.jobTitle;
        job.jobResponsibilities = updatedJob.jobResponsibilities;
        const result = await job.save();
        return result;
    }
    async deleteJob(jobId) {
        const job = await this.JobModel.findByIdAndRemove(jobId);
        if (!job) {
            throw new common_1.NotFoundException();
        }
        return await this.JobModel.find();
    }
};
JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Job')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map