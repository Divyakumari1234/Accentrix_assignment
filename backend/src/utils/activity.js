import Activity from '../models/Activity.js';

export const logActivity = async ({ actor, action, entity = '', entityId, metadata = {} }) => {
  try {
    await Activity.create({ actor, action, entity, entityId, metadata });
  } catch (error) {
    console.error(`Activity log failed: ${error.message}`);
  }
};
