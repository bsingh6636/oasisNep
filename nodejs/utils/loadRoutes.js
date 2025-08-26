const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
  const routerDir = path.join(__dirname, '../Router');
  const routesDir = path.join(__dirname, '../routes');

  const loadDirectoryRoutes = (directory) => {
    fs.readdirSync(directory).forEach(file => {
      if (file.endsWith('.js') && file !== 'index.js') {
        const routePath = path.join(directory, file);
        const route = require(routePath);
        if (typeof route.stack === 'function' || typeof route.router === 'function' || typeof route === 'function') {
          app.use('/api', route);
        }
      }
    });
  };

  loadDirectoryRoutes(routerDir);
  loadDirectoryRoutes(routesDir);
};

module.exports = loadRoutes;
