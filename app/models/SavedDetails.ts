import mongoose from "mongoose";

const { Schema } = mongoose;

/* Experience Sub-schema */
const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    responsibilities: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

/* Project Sub-schema */
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    tech: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

/* Education Sub-schema */
const EducationSchema = new Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { _id: false }
);

/* Main Portfolio Schema */
const SavedSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    about: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },

    experience: {
      type: [ExperienceSchema],
      default: [],
    },

    socials: {
      type: [Map],
      of: String,
      default: [],
    },

    projects: {
      type: [ProjectSchema],
      default: [],
    },

    education: {
      type: [EducationSchema],
      default: [],
    },

    skills: {
      type: [Map],
      of: Number,
      default: [],
    },

    resume: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SavedModel = mongoose.models.SavedDetails || mongoose.model("SavedDetails", SavedSchema);

export { SavedModel };
