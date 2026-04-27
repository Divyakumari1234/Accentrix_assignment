import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { logActivity } from '../utils/activity.js';

export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select('-password').populate('client', 'companyName');
  res.json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, status, client } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error('Email already exists');
  }
  const user = await User.create({ name, email, password, role, phone, status, client: client || undefined });
  await logActivity({ actor: req.user._id, action: `created user ${user.name}`, entity: 'User', entityId: user._id });
  res.status(201).json(await User.findById(user._id).select('-password').populate('client', 'companyName'));
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  ['name', 'email', 'role', 'phone', 'status', 'client'].forEach((field) => {
    if (req.body[field] !== undefined) user[field] = req.body[field] || undefined;
  });
  if (req.body.password) user.password = req.body.password;
  await user.save();
  await logActivity({ actor: req.user._id, action: `updated user ${user.name}`, entity: 'User', entityId: user._id });
  res.json(await User.findById(user._id).select('-password').populate('client', 'companyName'));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const deletedUserName = user.name;
  await user.deleteOne();
  await logActivity({ actor: req.user._id, action: `deleted user ${deletedUserName}`, entity: 'User', entityId: req.params.id });
  res.json({ message: 'User deleted' });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  ['name', 'phone'].forEach((field) => {
    if (req.body[field] !== undefined) user[field] = req.body[field];
  });
  if (req.file) user.avatar = `/uploads/${req.file.filename}`;
  if (req.body.currentPassword || req.body.newPassword) {
    if (!req.body.currentPassword || !req.body.newPassword || !(await user.matchPassword(req.body.currentPassword))) {
      res.status(400);
      throw new Error('Current password is incorrect');
    }
    user.password = req.body.newPassword;
  }
  await user.save();
  await logActivity({ actor: user._id, action: 'updated profile', entity: 'User', entityId: user._id });
  res.json(await User.findById(user._id).select('-password'));
});

export const getUserSummary = asyncHandler(async (req, res) => {
  const assignedProjects = await Project.find({ assignedUsers: req.user._id }).populate('client', 'companyName');
  res.json({
    assignedProjects,
    counts: {
      projects: assignedProjects.length,
      completed: assignedProjects.filter((p) => p.status === 'completed').length
    }
  });
});
