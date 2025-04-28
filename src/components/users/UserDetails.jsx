import React from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiDollarSign } from 'react-icons/fi';

const UserDetails = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">User Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FiUser className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FiPhone className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="font-medium">{user.phone}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FiMail className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FiDollarSign className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="font-medium">{user.balance.toFixed(2)} MAD</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FiCalendar className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Registered On</p>
            <p className="font-medium">{user.registeredOn}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Account Status</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.status === 'active' ? 'Active' : 'Blocked'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;