const authRoutes = require('./routes/auth.routes.js');
const chatRoutes = require('./routes/chat.routes.js');
const orderRoutes = require('./routes/order.routes.js');
const serviceRoutes = require('./routes/service.routes.js');
const pushRoutes = require('./routes/push.routes.js');

module.exports = async function(app) {
  const adminRouter = await import('./Router/admin.router.js');
  const pricesRouter = await import('./Router/prices.router.js');
  const router = await import('./Router/router.js');
  const userInfoRouter = await import('./Router/userInfo.router.js');

  app.use('/api/admin', adminRouter.default);
  app.use('/api/push', pushRoutes);
  app.use('/api', pricesRouter.default);
  app.use('/api', router.default);
  app.use('/api', userInfoRouter.default);

  authRoutes(app);
  chatRoutes(app);
  orderRoutes(app);
  serviceRoutes(app);
};
