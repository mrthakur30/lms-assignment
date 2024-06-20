import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const ReportsPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [memberships, setMemberships] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Master List of Books
    axios.get(`${BACKEND_URL}/api/book`)
      .then(response => {
        setBooks(response.data);
        // Filter issued books
        const issued = response.data.filter((book: any) => book.status === 'issued');
        setIssuedBooks(issued);
      })
      .catch(error => console.error('Error fetching books:', error));

    // Fetch Master List of Memberships
    axios.get(`${BACKEND_URL}/api/membership`)
      .then(response => setMemberships(response.data))
      .catch(error => console.error('Error fetching memberships:', error));

    // Fetch Users
    axios.get(`${BACKEND_URL}/api/user`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    // Fetch Transactions
    axios.get(`${BACKEND_URL}/api/transaction`)
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const renderList = (title: string, data: any[], fields: string[]) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">List is empty.</p>
      ) : (
        <ul className="bg-white shadow overflow-hidden sm:rounded-lg">
          {data.map((item, index) => (
            <li key={index} className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {fields.map((field, idx) => (
                <p key={idx} className="text-sm font-medium text-gray-500">
                  {field}: <span className="text-gray-900">{item[field]}</span>
                </p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Reports Page</h1>
      {renderList('Master List of Books', books, ['_id', 'title', 'author', 'category', 'status'])}
      {renderList('Master List of Memberships', memberships, ['_id', 'type', 'userId', 'endDate'])}
      {renderList('Users', users, ['_id', 'username', 'role', 'createdAt'])}
      {renderList('Issued Books', issuedBooks, ['_id', 'title', 'author', 'category'])}
      {renderList('Transactions', transactions, [ '_id', 'bookId', 'userId','issueDate', 'actualReturnDate','fine','status'])}
    </div>
  );
};

export default ReportsPage;