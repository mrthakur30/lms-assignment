import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const AdminHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<any[]>([]);

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/book`)
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }, []);

  return (
    <div className="container mx-auto my-4 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Admin Home Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          onClick={() => handleRedirect('/transactions')}
          className="cursor-pointer p-5 bg-red-500 text-white rounded-md"
        >
          <h2 className="text-xl font-semibold">Transactions</h2>
        </div>
        <div
          onClick={() => handleRedirect('/reports')}
          className="cursor-pointer p-5 bg-blue-500 text-white rounded-md"
        >
          <h2 className="text-xl font-semibold">Reports</h2>
        </div>
        <div
          onClick={() => handleRedirect('/maintenance')}
          className="cursor-pointer p-5 bg-green-500 text-white rounded-md"
        >
          <h2 className="text-xl font-semibold">Maintenance</h2>
        </div>
      </div>
      <h2 className="text-3xl font-bold mt-10 mb-4">All Books and Their Availability</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="p-5  rounded-md border">
            <h3 className="text-2xl font-semibold">{book.title}</h3>
            <p className="text-lg">Author: {book.author}</p>
            <p className="text-md">Category: {book.category}</p>
            <p className="text-md">Status: {book.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
