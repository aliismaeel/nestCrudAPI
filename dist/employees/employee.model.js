"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const mongoose = require("mongoose");
exports.EmployeeSchema = new mongoose.Schema({
    empName: {
        type: String,
        required: true
    },
    empSalary: {
        type: Number,
        required: true
    },
    empJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
});
//# sourceMappingURL=employee.model.js.map