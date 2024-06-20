import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import toast from 'react-hot-toast';

const formatDate = (dateString : any) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const IssueBook: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [issueFormData, setIssueFormData] = useState({
    bookName: '',
    author: '',
    issueDate: '',
    returnDate: '',
  });

  useEffect(() => {
    // Fetch available books for dropdown
    axios.get(`${BACKEND_URL}/api/book`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });

    // Set default values for issue and return dates
    const today = new Date().toISOString().split('T')[0];
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 15);
    const formattedReturnDate = returnDate.toISOString().split('T')[0];

    setIssueFormData({
      ...issueFormData,
      issueDate: today,
      returnDate: formattedReturnDate,
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssueFormData(prevState => ({ ...prevState, [name]: value }));

    // Autofill author field based on selected book
    if (name === 'bookName') {
      const selectedBook = books.find(book => book.title === value);
      if (selectedBook) {
        setIssueFormData(prevState => ({
          ...prevState,
          author: selectedBook.author,
        }));
      }
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookId = books.find(book => book.title === issueFormData.bookName)?._id;
      const payload = { userId, bookId };
      await axios.post(`${BACKEND_URL}/api/transaction/issue`, payload);
      toast.success('Book issued successfully')
    } catch (error) {
      toast.error('Error issuing book')
      console.error('Error issuing book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Enter Book Name</label>
        <select
          name="bookName"
          value={issueFormData.bookName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>Select a book</option>
          {books.map((book) => (
            <option key={book._id} value={book.title}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          value={issueFormData.author}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Issue Date</label>
        <input
          type="text"
          name="issueDate"
          value={formatDate(issueFormData.issueDate)}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Return Date</label>
        <input
          type="text"
          name="returnDate"
          value={formatDate(issueFormData.returnDate)}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User ID</label>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={handleUserIdChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Issue Book
      </button>
    </form>
  );
};

export default IssueBook;