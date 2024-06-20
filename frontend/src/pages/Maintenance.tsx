import React, { useState } from 'react';
import CreateUserForm from '../components/maintenance/CreateUserForm';
import UpdateUserForm from '../components/maintenance/UpdateUserForm';
import CreateMembershipForm from '../components/maintenance/CreateMembershipForm';
import UpdateMembershipForm from '../components/maintenance/UpdateMembershipForm';
import CreateBookForm from '../components/maintenance/CreateBookForm';
import UpdateBookForm from '../components/maintenance/UpdateBookForm';

const MaintenancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Maintenance Page</h2>
      <div className="tabs mb-6">
        <button
          className={`tab ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('users')}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'memberships' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('memberships')}
        >
          Memberships
        </button>
        <button
          className={`tab ${activeTab === 'books' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('books')}
        >
          Books
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'users' && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Create User</h3>
            <CreateUserForm />
            <h3 className="text-xl font-bold mt-6 mb-3">Update User</h3>
            <UpdateUserForm />
          </div>
        )}
        {activeTab === 'memberships' && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Create Membership</h3>
            <CreateMembershipForm />
            <h3 className="text-xl font-bold mt-6 mb-3">Update Membership</h3>
            <UpdateMembershipForm />
          </div>
        )}
        {activeTab === 'books' && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Create Book</h3>
            <CreateBookForm />
            <h3 className="text-xl font-bold mt-6 mb-3">Update Book</h3>
            <UpdateBookForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
