import express from 'express';
import {
  getAllProjects,
  postProject,
  getProjectById,
  
} from '../controller/projectController.js';
import verifyUserMiddleware from '../middleware/verifyUserMiddleware.js';

const projectRouter = express.Router();

// Create new project
projectRouter.post('/create', verifyUserMiddleware, postProject);

// Get all projects (with filters, pagination, search)
projectRouter.get('/', getAllProjects);

// Get a project by ID
projectRouter.get('/:id', getProjectById);


export default projectRouter;
