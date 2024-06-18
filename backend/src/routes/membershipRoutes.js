import { Router } from 'express';
const router = Router();
import asyncHandler from '../utils/asyncHandler.js';
import { addMembership, updateMembership, deleteMembership, getMemberships, getMembershipById } from '../controllers/membershipController.js';

router.post('/', asyncHandler(addMembership));
router.put('/:id', asyncHandler(updateMembership));
router.delete('/:id', asyncHandler(deleteMembership));
router.get('/', asyncHandler(getMemberships));
router.get('/:id', asyncHandler(getMembershipById));

export default router;
