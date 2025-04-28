import React, { useState } from 'react';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { toggleUserStatus } from '../../services/users';
import { toast } from 'react-toastify';

const UserControls = ({ user, onUserUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await toggleUserStatus(user.id);
      
      if (updatedUser) {
        onUserUpdate(updatedUser);
        toast.success(`User has been ${updatedUser.status === 'active' ? 'activated' : 'blocked'} successfully`);
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast.error('An error occurred while updating user status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Account Controls</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Account Status Management</p>
          <button
            onClick={handleToggleStatus}
            disabled={isLoading}
            className={`flex items-center px-4 py-2 rounded-md text-white ${
              user.status === 'active'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } transition-colors`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                {user.status === 'active' ? (
                  <>
                    <FiLock className="mr-2" /> Block User
                  </>
                ) : (
                  <>
                    <FiUnlock className="mr-2" /> Activate User
                  </>
                )}
              </>
            )}
          </button>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">Other Actions</p>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Reset Password
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Edit User Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserControls;