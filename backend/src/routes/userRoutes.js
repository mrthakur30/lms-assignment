import { Router } from 'express';
const router = Router();
import asyncHandler from '../utils/asyncHandler.js';
import { getAllUsers, getUserById, createUser, updateUser } from '../controllers/userController.js';

router.get('/', asyncHandler(getAllUsers));
router.get('/:id', asyncHandler(getUserById));
router.post('/', asyncHandler(createUser));
router.put('/:id', asyncHandler(updateUser));

export default router;
