import mongoose, { Schema } from "mongoose";

export interface Submission {
  fullName: string;
  dob: string;
  mothersName: string;
  fathersName: string;
  address: string;
  bloodGroup: string;
  issuedDate: string;
  picture: string;
}
const submissionSchema: Schema<Submission> = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  mothersName: {
    type: String,
    trim: true,
    required: true,
  },
  fathersName: {
    type: String,
    trim: true,
    required: true,
  },
  dob: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  issuedDate: {
    type: String,
    trim: true,
    required: true,
  },
  bloodGroup: {
    type: String,
    trim: true,
  },
  picture: {
    type: String,
    trim: true,
  },
});

const submissionModel = mongoose.models?.Submission
  ? (mongoose.models.Submission as mongoose.Model<Submission>)
  : mongoose.model<Submission>("Submission", submissionSchema);

export default submissionModel;
