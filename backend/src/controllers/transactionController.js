import Transaction  from '../models/Transaction.js';
import Book from '../models/Book.js';

const FINE_PER_DAY = 5;

const issueBook = async (req, res, next) => {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    if (book.status !== 'available') {
        return res.status(400).json({ message: 'Book is not available' });
    }

    const transaction = new Transaction({
        bookId,
        userId,
        issueDate: new Date(),
        returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });
    await transaction.save();

    book.status = 'issued';
    await book.save();

    res.status(201).json(transaction);
};

const returnBook = async (req, res, next) => {
    const { bookId, userId } = req.body;
    const transaction = await Transaction.findOne({ bookId, userId, status: 'issued' });
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }

    const returnDate = new Date();
    const daysLate = Math.ceil((returnDate - transaction.returnDate) / (1000 * 60 * 60 * 24));
    const fine = daysLate > 0 ? daysLate * FINE_PER_DAY : 0;

    if (fine > 0) {
        return res.status(400).json({ message: `Book returned late. Fine: Rs.${fine}` });
    }

    transaction.status = 'returned';
    transaction.actualReturnDate = returnDate;
    await transaction.save();

    const book = await Book.findById(bookId);
    book.status = 'available';
    await book.save();

    res.json(transaction);
};

const getTransactions = async (req, res, next) => {
    const transactions = await Transaction.find().populate('bookId').populate('userId');
    res.json(transactions);
};

const getTransactionById = async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id).populate('bookId').populate('userId');
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
};

export {
    issueBook,
    returnBook,
    getTransactions,
    getTransactionById,
};
