// backend/routes/index.js

import authRoutes from './auth.routes.js';
import contractRoutes from './contract.routes.js';
import debugRoutes from './debug.routes.js';
import propertyRoutes from './property.routes.js';
import tenantRoutes from './tenant.routes.js';
import paymentRoutes from './payment.routes.js';
import receiptRoutes from './receipt.routes.js';
import userRoutes from './user.routes.js';
import templateRoutes from './template.routes.js';

export {
  authRoutes,
  contractRoutes,
  debugRoutes,
  propertyRoutes,
  tenantRoutes,
  paymentRoutes,
  receiptRoutes,
  userRoutes,
  templateRoutes,
};
