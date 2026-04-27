import asyncHandler from 'express-async-handler';
import Client from '../models/Client.js';
import User from '../models/User.js';
import { logActivity } from '../utils/activity.js';

export const listClients = asyncHandler(async (_req, res) => {
  const clients = await Client.find().populate('owner', 'name email');
  res.json(clients);
});

export const createClient = asyncHandler(async (req, res) => {
  const client = await Client.create(req.body);
  if (req.body.owner) await User.findByIdAndUpdate(req.body.owner, { role: 'client', client: client._id });
  await logActivity({ actor: req.user._id, action: 'created client', entity: 'Client', entityId: client._id });
  res.status(201).json(await Client.findById(client._id).populate('owner', 'name email'));
});

export const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('owner', 'name email');
  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }
  if (req.body.owner) await User.findByIdAndUpdate(req.body.owner, { role: 'client', client: client._id });
  await logActivity({ actor: req.user._id, action: 'updated client', entity: 'Client', entityId: client._id });
  res.json(client);
});

export const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }
  await client.deleteOne();
  await logActivity({ actor: req.user._id, action: 'deleted client', entity: 'Client', entityId: req.params.id });
  res.json({ message: 'Client deleted' });
});
