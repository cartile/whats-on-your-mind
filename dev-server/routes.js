import thoughtRoutes from './api/thought/thought-routes.js';


function registerRoutes(app) {
  app.use('/api', thoughtRoutes);
}

export default registerRoutes;
