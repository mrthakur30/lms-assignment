import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../config';

const CreateMembershipForm: React.FC = () => {
  const [type, setType] = useState('6 months');
  const [startDate, setStartDate] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/membership`, {
        userId : userId,
        type : type,
        startDate : startDate
      })
      toast.success('Successfully created membership')
    } catch (error) {
      console.log(error);
      toast.error('Error creating membership')
    }
    setUserId('');
    setType('6 months');
    setStartDate('');
    console.log('Creating membership:', { type, startDate, userId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
          User ID
        </label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
          Membership Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="6 months">6 months</option>
          <option value="1 year">1 year</option>
          <option value="2 years">2 years</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Membership
      </button>
    </form>
  );
};

export default CreateMembershipForm;