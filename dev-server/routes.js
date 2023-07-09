import thoughtRoutes from './api/thought/thought-routes.js';
import regRoutes from './api/register/register-routes'
import userRoutes from './api/user/user-routes'
import authRoutes from './api/auth/auth-routes'

function registerRoutes(app) {
  app.use('/api', thoughtRoutes);
  app.use('/api', regRoutes);
  app.use('/api', userRoutes);
  app.use('/api', authRoutes);
}

export default registerRoutes;
