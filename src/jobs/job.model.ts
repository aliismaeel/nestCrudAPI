import * as mongoose from 'mongoose'; 

export const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },

  jobResponsibilities: {
    type: String,
    required: true
  }
})

export interface Job{
  jobId: string,
  jobTitle: string,
  jobResponsibilities: string
}