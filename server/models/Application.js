
const mongoose = require("mongoose");

// Define the information stored for each job application
const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    applicationUrl: {
      type: String,
      default: "",
    },
    jobDescription: {
      type: String,
      default: "",
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Assessment",
        "Interview",
        "Offer",
        "Rejected",
      ],
      default: "Saved",
    },
    applicationDate: {
      type: Date,
      default: null,
    },
    deadline: {
      type: Date,
      default: null,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    interviewDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Export the model for use in application routes
module.exports = mongoose.model("Application", applicationSchema);
