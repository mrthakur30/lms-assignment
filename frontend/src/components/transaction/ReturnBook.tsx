import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import toast from 'react-hot-toast';

const ReturnBook: React.FC = () => {
  const [returnFormData, setReturnFormData] = useState({
    transactionId: '',
    bookId: '',
    issueDate: '',
    returnDate: new Date().toISOString().split('T')[0], // Set to today's date
    fine: 0,
  });

  const [userId, setUserId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReturnFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTransactionDetailsFetch = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/transaction/${returnFormData.transactionId}`);
      const transaction = response.data;
      const currentDate = new Date().toISOString().split('T')[0];
      const issueDate = new Date(transaction.issueDate);

      // Calculate fine
      const returnDate = new Date(currentDate);
      const timeDiff = Math.abs(returnDate.getTime() - issueDate.getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const fine = dayDiff > 14 ? (dayDiff - 14) * 5 : 0; // Assuming fine is Rs 5 per day after 14 days

      const date = new Date(transaction.issueDate);
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
      const day = String(date.getDate()).padStart(2, '0'); // Pad the day with a leading zero if needed
      const year = date.getFullYear();

      const formattedDate = `${month}/${day}/${year}`;
      setUserId(transaction.userId);

      setReturnFormData({
        ...returnFormData,
        bookId: transaction.bookId,
        issueDate: formattedDate,
        fine,
      });

     
    } catch (error) {
      console.error('Error fetching transaction:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/transaction/return`, {
          bookId : returnFormData.bookId,
          userId : userId
      });
      toast.success("Book returned successfully")
    } catch (error) {
      toast.error('Error returning book')
      console.error('Error returning book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Transaction ID</label>
        <input
          type="text"
          name="transactionId"
          value={returnFormData.transactionId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={handleTransactionDetailsFetch}
          className="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md ml-2"
        >
          Get Details
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Book ID</label>
        <input
          type="text"
          name="bookId"
          value={returnFormData.bookId}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Issue Date</label>
        <input
          type="text"
          name="issueDate"
          value={returnFormData.issueDate}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Return Date</label>
        <input
          type="date"
          name="returnDate"
          value={returnFormData.returnDate}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Fine</label>
        <input
          type="text"
          name="fine"
          value={returnFormData.fine}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Return Book
      </button>
    </form>
  );
};

export default ReturnBook;
