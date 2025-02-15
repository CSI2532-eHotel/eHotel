import express from 'express';
import userRoutes from './users';
// Import other route files here as we create them

const router = express.Router();

router.use('/users', userRoutes); //This registers `/api/users`
// Add other routes here as we create them

export default router;