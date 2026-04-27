import asyncHandler from 'express-async-handler';
import Setting from '../models/Setting.js';

export const getSettings = asyncHandler(async (_req, res) => {
  let settings = await Setting.findOne();
  if (!settings) settings = await Setting.create({});
  res.json(settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) settings = await Setting.create({});
  ['portalName', 'allowRegistration', 'supportEmail'].forEach((field) => {
    if (req.body[field] !== undefined) settings[field] = req.body[field];
  });
  await settings.save();
  res.json(settings);
});
