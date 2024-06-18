// Example bookRoutes.js
import { Router } from 'express';
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from '../controllers/bookController.js';
import asyncHandler from '../utils/asyncHandler.js';
const router = Router();

router.get('/', asyncHandler(getAllBooks));
router.get('/:id', asyncHandler(getBookById));
router.post('/', asyncHandler(addBook));
router.put('/:id', asyncHandler(updateBook));
router.delete('/:id', asyncHandler(deleteBook));

export default router;
