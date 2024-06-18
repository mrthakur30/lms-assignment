import Book from '../models/Book.js';

const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
};

const addBook = async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({book: book , message: 'Book saved successfully'});
};

const updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
};

const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
};

export {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
