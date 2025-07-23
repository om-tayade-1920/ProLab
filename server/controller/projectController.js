import errorHandler from "../utils/errorHandler.js";
import asyncHandler from 'express-async-handler';
import projectModel from "../model/projectModel.js"; // still named blogModel
import userModel from '../model/userModel.js';

//  Get All Projects (with filters)
export const getAllProjects = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const sort = req.query.sort === 'asc' ? 1 : -1;
  const skip = (page - 1) * limit;

  const filter = {
    ...(req.query.userId && { postedBy: req.query.userId }),
    ...(req.query.title && { title: { $regex: req.query.title, $options: 'i' } }),
    ...(req.query.branch && { branch: req.query.branch }),
    ...(req.query.year && { year: req.query.year }),
    ...(req.query.tags && { tags: { $in: req.query.tags.split(',') } }),
  };

  const projects = await projectModel.find(filter)
    .sort({ updatedAt: sort })
    .skip(skip)
    .limit(limit)
    .populate("postedBy", "name email");

  const count = await projectModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    total: count,
    projects
  });
});

//  Create New Project
export const postProject = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const {
    title, description, tags, branch, year,
    techStack, githubLink, reportLink, screenshots
  } = req.body;


  const newProject = new projectModel({
    title,
    description,
    tags,
    branch,
    year,
    techStack,
    githubLink,
    reportLink,
    screenshots,
    postedBy: user._id,
  });

  await newProject.save();

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project: newProject
  });
});

//  Get Project by ID
export const getProjectById = asyncHandler(async (req, res, next) => {
  const project = await projectModel.findById(req.params.id).populate("postedBy", "-password");
  if (!project) return next(errorHandler("Project not found", 404));
  res.status(200).json(project);
});
