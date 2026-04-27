import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import Report from '../models/Report.js';
import Activity from '../models/Activity.js';
import Setting from '../models/Setting.js';

dotenv.config();
await connectDB();

await Promise.all([
  User.deleteMany(),
  Client.deleteMany(),
  Project.deleteMany(),
  Report.deleteMany(),
  Activity.deleteMany(),
  Setting.deleteMany()
]);

const admin = await User.create({
  name: 'Admin Manager',
  email: 'admin@accentrix.local',
  password: 'Admin@123',
  role: 'admin',
  phone: '+91 90000 00001'
});

const clientUser = await User.create({
  name: 'Client Owner',
  email: 'client@accentrix.local',
  password: 'Client@123',
  role: 'client',
  phone: '+91 90000 00002'
});

const user = await User.create({
  name: 'Portal User',
  email: 'user@accentrix.local',
  password: 'User@123',
  role: 'user',
  phone: '+91 90000 00003'
});

const client = await Client.create({
  companyName: 'Northstar Retail Pvt Ltd',
  contactName: 'Client Owner',
  email: 'client@accentrix.local',
  phone: '+91 90000 00002',
  industry: 'Retail',
  owner: clientUser._id
});

clientUser.client = client._id;
await clientUser.save();

await Project.create([
  {
    title: 'Customer Portal Revamp',
    description: 'Modernize customer-facing project workflows and status visibility.',
    client: client._id,
    assignedUsers: [user._id],
    status: 'in-progress',
    dueDate: new Date('2026-06-15'),
    budget: 450000
  },
  {
    title: 'Analytics Dashboard',
    description: 'Build executive reporting for client operations.',
    client: client._id,
    assignedUsers: [user._id],
    status: 'review',
    dueDate: new Date('2026-05-20'),
    budget: 275000
  }
]);

await Report.create([
  { title: 'Monthly Project Completion', type: 'project', value: 72, notes: 'Completion rate across active projects' },
  { title: 'Client Engagement Index', type: 'client', value: 88, notes: 'Based on update frequency and review attendance' },
  { title: 'Activity Volume', type: 'activity', value: 134, notes: 'Tracked portal actions for the current month' }
]);

await Activity.create([
  { actor: admin._id, action: 'seeded demo database', entity: 'System' },
  { actor: clientUser._id, action: 'reviewed assigned projects', entity: 'Project' },
  { actor: user._id, action: 'updated profile details', entity: 'User' }
]);

await Setting.create({
  portalName: 'Accentrix Project Portal',
  allowRegistration: true,
  supportEmail: 'support@accentrix.local'
});

console.log('Database seeded');
console.log('Admin:  admin@accentrix.local  / Admin@123');
console.log('Client: client@accentrix.local / Client@123');
console.log('User:   user@accentrix.local   / User@123');
await mongoose.disconnect();
