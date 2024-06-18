import { Router } from 'express';
const router = Router();
import asyncHandler from '../utils/asyncHandler.js';
import { issueBook, returnBook, getTransactions, getTransactionById } from '../controllers/transactionController.js';

router.post('/issue', asyncHandler(issueBook));
router.post('/return', asyncHandler(returnBook));
router.get('/', asyncHandler(getTransactions));
router.get('/:id', asyncHandler(getTransactionById));

export default router;
