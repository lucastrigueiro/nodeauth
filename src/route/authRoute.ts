import { Router } from 'express';
import AuthController from '../controller/AuthController';

const authController = new AuthController();

const router = Router();

router.post('/login', (req, res, next) => authController.login(req, res, next));


export default router;
