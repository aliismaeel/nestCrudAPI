"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSchema = void 0;
const mongoose = require("mongoose");
exports.jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobResponsibilities: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=job.model.js.map