import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Setting from '../models/Setting.js';
import { generateToken } from '../utils/token.js';
import { logActivity } from '../utils/activity.js';

const sendUser = (user, res, status = 200) => {
  res.status(status).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      client: user.client
    }
  });
};

export const register = asyncHandler(async (req, res) => {
  const setting = await Setting.findOne();
  if (setting && !setting.allowRegistration) {
    res.status(403);
    throw new Error('Registration is currently disabled');
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error('Email already registered');
  }

  const user = await User.create({ name, email, password, role: 'user' });
  await logActivity({ actor: user._id, action: 'registered', entity: 'User', entityId: user._id });
  sendUser(user, res, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  if (user.status !== 'active') {
    res.status(403);
    throw new Error('Account is inactive');
  }
  await logActivity({ actor: user._id, action: 'logged in', entity: 'User', entityId: user._id });
  sendUser(user, res);
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
