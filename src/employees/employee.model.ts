import * as mongoose from "mongoose";

export const EmployeeSchema = new mongoose.Schema({
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

export class Employee{
  empId: string;
  empName: string;
  empSalary: number;
  empJobs: mongoose.Schema.Types.ObjectId[]
}