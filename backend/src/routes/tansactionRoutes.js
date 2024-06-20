import { Router } from 'express';
const router = Router();
import asyncHandler from '../utils/asyncHandler.js';
import { issueBook, returnBook, getTransactions, getTransactionById, payFine } from '../controllers/transactionController.js';

router.post('/issue', asyncHandler(issueBook));
router.post('/return', asyncHandler(returnBook));
router.get('/', asyncHandler(getTransactions));
router.post('/pay-fine/:transactionId', asyncHandler(payFine)); 
router.get('/:id', asyncHandler(getTransactionById));

export default router;
