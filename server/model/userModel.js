import mongoose from "mongoose";

const emailRegex = /@students\.vnit\.ac\.in$/; // Restrict to VNIT student emails

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: emailRegex, // restrict to VNIT student emails
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Exclude password from default queries
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      enum: [
        "CSE",
        "ECE",
        "EEE",
        "MECH",
        "CIVIL",
        "CHEMICAL",
        "METALLURGY",
        "MINING",
        "ARCHITECTURE",
        "OTHER",
      ],
    },
    passOutYear: {
      type: Number,
      required: true,
      max: 2030,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hide password in JSON responses even if selected
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;
