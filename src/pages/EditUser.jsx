import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { getUserById, updateUser, createUser } from '../services/users';
import { toast } from 'react-toastify';
import { FiSave, FiX, FiUser } from 'react-icons/fi';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isNewUser = userId === 'new';
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    balance: 0,
    status: 'active',
    address: '',
    birthday: ''
  });
  
  useEffect(() => {
    const loadUser = async () => {
      if (isNewUser) {
        setIsLoading(false);
        return;
      }
      
      try {
        const userData = await getUserById(userId);
        if (userData) {
          setFormData({
            name: userData.name || '',
            phone: userData.phone || '',
            email: userData.email || '',
            balance: userData.balance || 0,
            status: userData.status || 'active',
            address: userData.address || '',
            birthday: userData.birthday || ''
          });
        } else {
          toast.error('User not found');
          navigate('/users');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, [userId, isNewUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (isNewUser) {
        const newUser = await createUser(formData);
        toast.success('User created successfully');
        navigate(`/users/${newUser.id}`);
      } else {
        await updateUser(userId, formData);
        toast.success('User updated successfully');
        navigate(`/users/${userId}`);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user data');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate(isNewUser ? '/users' : `/users/${userId}`);
  };

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isNewUser ? 'Create New User' : 'Edit User'}
          </h1>
          <p className="mt-1 text-gray-600">
            {isNewUser ? 'Add a new user to the system' : 'Update user information'}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FiX className="mr-2 -ml-1 h-5 w-5" />
            Cancel
          </button>
          
          <button
            type="submit"
            form="user-form"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2 -ml-1 h-5 w-5" />
                Save User
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form id="user-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Address Section */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Address</h2>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
              </div>
              
              {/* Account Details */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Balance (MAD)
                    </label>
                    <input
                      type="number"
                      id="balance"
                      name="balance"
                      value={formData.balance}
                      onChange={handleChange}
                      step="0.01"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </MainLayout>
  );
};

export default EditUser;