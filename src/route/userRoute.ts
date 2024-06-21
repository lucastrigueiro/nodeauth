import { Router } from 'express';
import UserController from '../controller/UserController';
import { authenticateJwt, checkRole } from '../config/middlewares/authMiddleware';

const userController = new UserController();

const router = Router();

router.get('/', [authenticateJwt, checkRole(['ROLE_ADMIN'])], (req, res, next) => userController.findAll(req, res, next));

export default router;
