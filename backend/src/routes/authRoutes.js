import { Router } from 'express';
const router = Router();
import asyncHandler from '../utils/asyncHandler.js';
import { register, login} from '../controllers/authController.js';

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

export default router;
