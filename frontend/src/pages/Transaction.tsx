import React, { useState } from 'react';
import IssueBook from '../components/transaction/IssueBook';
import ReturnBook from '../components/transaction/ReturnBook';

const TransactionPage: React.FC = () => {
  const [tab, setTab] = useState('issue');

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Transaction Page</h2>
      <div className="tabs mb-6">
        <button
          className={`tab p-2 rounded-sm ${tab === 'issue' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('issue')}
        > 
          Issue Book
        </button>
        <button
          className={`tab p-2 rounded-sm ${tab === 'return' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('return')}
        >
          Return Book
        </button>
      </div>
      {tab === 'issue' && <IssueBook />}
      {tab === 'return' && <ReturnBook />}
    </div>
  );
};

export default TransactionPage;
