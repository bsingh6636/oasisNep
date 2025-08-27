const controller = require('../controllers/order.controller.js');
const { verifyToken, isAdmin } = require('../middleware/auth.jwt');

module.exports = function(app) {
  // Customer routes
  app.post('/api/orders/create', [verifyToken], controller.createOrder);
  app.get('/api/orders', [verifyToken], controller.getUserOrders);
  // In a real app, you would use a file upload middleware like multer here
  app.post('/api/orders/:id/upload-proof', [verifyToken], controller.uploadProof); // Simplified for now
  app.get('/api/orders/:id/secret', [verifyToken], controller.getSecret);

  // Admin routes
  app.get('/api/admin/orders', [verifyToken, isAdmin], controller.getAllOrders);
  app.patch('/api/admin/orders/:id/approve', [verifyToken, isAdmin], controller.approveOrder);
  app.patch('/api/admin/orders/:id/reject', [verifyToken, isAdmin], controller.rejectOrder);
};
