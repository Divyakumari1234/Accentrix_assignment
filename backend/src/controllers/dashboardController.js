import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import Activity from '../models/Activity.js';

export const getDashboard = asyncHandler(async (req, res) => {
  if (req.user.role === 'admin') {
    const [totalUsers, totalClients, totalProjects, completedProjects, recentActivity] = await Promise.all([
      User.countDocuments(),
      Client.countDocuments(),
      Project.countDocuments(),
      Project.countDocuments({ status: 'completed' }),
      Activity.find().sort({ createdAt: -1 }).limit(8).populate('actor', 'name role')
    ]);
    return res.json({
      role: 'admin',
      stats: { totalUsers, totalClients, totalProjects, completedProjects },
      recentActivity
    });
  }

  if (req.user.role === 'client') {
    const projects = await Project.find({ client: req.user.client }).populate('assignedUsers', 'name email');
    return res.json({
      role: 'client',
      notifications: [
        { title: 'Project review', message: 'Review statuses and update blockers before the weekly call.' },
        { title: 'Profile', message: 'Keep contact information current for project updates.' }
      ],
      summary: {
        projects: projects.length,
        inProgress: projects.filter((p) => p.status === 'in-progress').length,
        completed: projects.filter((p) => p.status === 'completed').length
      },
      projects
    });
  }

  const assignedProjects = await Project.find({ assignedUsers: req.user._id }).populate('client', 'companyName');
  return res.json({
    role: 'user',
    summary: {
      assignedProjects: assignedProjects.length,
      completed: assignedProjects.filter((p) => p.status === 'completed').length
    },
    assignedProjects
  });
});
