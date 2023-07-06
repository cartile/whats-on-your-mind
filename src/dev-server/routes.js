import thoughtRoutes from '../api/thought/thought-routes.js'

export function registerRoutes(app) {
    app.use('/api', thoughtRoutes)
}