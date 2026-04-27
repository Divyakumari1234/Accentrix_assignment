import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { logActivity } from '../utils/activity.js';

const projectPopulate = [
  { path: 'client', select: 'companyName owner' },
  { path: 'assignedUsers', select: 'name email role' }
];

export const listProjects = asyncHandler(async (req, res) => {
  const query = {};
  if (req.user.role === 'client') query.client = req.user.client;
  if (req.user.role === 'user') query.assignedUsers = req.user._id;
  const projects = await Project.find(query).populate(projectPopulate).sort({ dueDate: 1 });
  res.json(projects);
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  await logActivity({ actor: req.user._id, action: 'created project', entity: 'Project', entityId: project._id });
  res.status(201).json(await Project.findById(project._id).populate(projectPopulate));
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  if (req.user.role === 'client' && String(project.client) !== String(req.user.client)) {
    res.status(403);
    throw new Error('Cannot update another client project');
  }
  const allowed = req.user.role === 'client' ? ['status'] : ['title', 'description', 'client', 'assignedUsers', 'status', 'dueDate', 'budget'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) project[field] = req.body[field];
  });
  await project.save();
  await logActivity({ actor: req.user._id, action: 'updated project', entity: 'Project', entityId: project._id });
  res.json(await Project.findById(project._id).populate(projectPopulate));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  await project.deleteOne();
  await logActivity({ actor: req.user._id, action: 'deleted project', entity: 'Project', entityId: req.params.id });
  res.json({ message: 'Project deleted' });
});
