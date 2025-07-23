import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 5000,
    },
    tags: {
        type: [String], // Example: ["AI", "IoT", "Final Year"]
        default: [],
    },
    branch: {
        type: String,
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
        required: true,
    },
    year: {
        type: String,
        enum: ["2026", "2027", "2028", "2029", "Other"],
        required: true,
    },
    techStack: {
        type: [String], // Example: ["React", "Node", "MongoDB"]
        default: [],
    },
    githubLink: {
        type: String,
        trim: true,
    },
    reportLink: {
        type: String,
        trim: true,
    },
    screenshots: {
        type: [String], // Array of image URLs (stored via Cloud or similar)
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    { timestamps: true }
);
const blogModel = mongoose.model('blog', blogSchema);;

export default blogModel;