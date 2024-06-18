import { Router } from 'express';
const router = Router();
import asyncHandler from '../utils/asyncHandler.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

router.get('/', asyncHandler(getAllUsers));
router.get('/:id', asyncHandler(getUserById));
router.post('/', asyncHandler(createUser));
router.put('/:id', asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));

export default router;
