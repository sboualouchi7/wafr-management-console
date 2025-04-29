import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { getUserById, toggleUserStatus } from '../services/users';
import { generateTransactionsPDF } from '../services/pdfGenerator';
import { toast } from 'react-toastify';
import { 
  FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, 
  FiDollarSign, FiEdit, FiDownload, FiLock, FiUnlock 
} from 'react-icons/fi';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlocking, setIsBlocking] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        
        if (userData) {
          setUser(userData);
        } else {
          toast.error('User not found');
          navigate('/users');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId, navigate]);
  
  const handleToggleStatus = async () => {
    if (!user) return;
    
    setIsBlocking(true);
    
    try {
      const updatedUser = await toggleUserStatus(user.id);
      
      if (updatedUser) {
        setUser(updatedUser);
        toast.success(`User has been ${updatedUser.status === 'active' ? 'activated' : 'blocked'} successfully`);
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast.error('An error occurred while updating user status');
    } finally {
      setIsBlocking(false);
    }
  };
  
  const handleExportPDF = () => {
    if (!user) return;
    
    try {
      const pdfName = generateTransactionsPDF(user);
      toast.success(`PDF generated: ${pdfName}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };
  
  const TransactionItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${
          transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <FiDollarSign className={`h-5 w-5 ${
            transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
          }`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
          </p>
          <p className="text-xs text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <div>
        <p className={`text-sm font-medium ${
          transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction.type === 'deposit' ? '+' : '-'}{Math.abs(transaction.amount).toFixed(2)} MAD
        </p>
        <p className="text-xs text-right text-gray-500">{transaction.status}</p>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
          <p className="mt-1 text-gray-600">View and manage user information</p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to="/users"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Back to Users
          </Link>
          
          {user && (
            <Link
              to={`/users/edit/${userId}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FiEdit className="mr-2 -ml-1 h-5 w-5" />
              Edit User
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : user ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-primary p-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <FiUser className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-blue-100">
                    Account {user.status === 'active' ? 'Active' : 'Blocked'}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-medium text-gray-800 mb-4">Account Information</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <FiPhone className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <FiMail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <FiCalendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Registered On</p>
                      <p className="font-medium">{user.registeredOn}</p>
                    </div>
                  </div>
                  
                  {user.birthday && (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiCalendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date of Birth</p>
                        <p className="font-medium">{user.birthday}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.address && (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiMapPin className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium">{user.address}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <FiDollarSign className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Balance</p>
                      <p className="font-medium text-lg">{user.balance.toFixed(2)} MAD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-medium text-gray-800 mb-4">Account Controls</h4>
              
              <div className="space-y-4">
                <button
                  onClick={handleToggleStatus}
                  disabled={isBlocking}
                  className={`flex items-center justify-center w-full px-4 py-3 rounded-lg ${
                    user.status === 'active'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } transition-colors`}
                >
                  {isBlocking ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    user.status === 'active' ? (
                      <FiLock className="mr-2" />
                    ) : (
                      <FiUnlock className="mr-2" />
                    )
                  )}
                  {user.status === 'active' ? 'Block User' : 'Activate User'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Transactions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Transaction History</h3>
                  <p className="text-sm text-gray-500">Recent account activities</p>
                </div>
                <button
                  onClick={handleExportPDF}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  <FiDownload className="mr-2 h-4 w-4" />
                  Export PDF
                </button>
              </div>
              
              <div className="overflow-hidden">
                {user.transactions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {user.transactions.map((transaction) => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions yet</h3>
                    <p className="mt-1 text-sm text-gray-500">This user hasn't made any transactions.</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                <p className="text-sm text-gray-500">
                  Total of {user.transactions.length} transactions
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Account Analytics</h3>
                <p className="text-sm text-gray-500">Activity summary for this user</p>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Average Transaction</h4>
                  <p className="text-2xl font-bold text-blue-900">
                    {user.transactions.length > 0 
                      ? (user.transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / user.transactions.length).toFixed(2)
                      : '0.00'} MAD
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Total Deposits</h4>
                  <p className="text-2xl font-bold text-green-900">
                    {user.transactions
                      .filter(t => t.type === 'deposit')
                      .reduce((sum, t) => sum + t.amount, 0).toFixed(2)} MAD
                  </p>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Total Withdrawals</h4>
                  <p className="text-2xl font-bold text-red-900">
                    {user.transactions
                      .filter(t => t.type === 'withdrawal')
                      .reduce((sum, t) => sum + Math.abs(t.amount), 0).toFixed(2)} MAD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FiUser className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">User Not Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            The user you're looking for doesn't exist or has been removed.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default UserDetail;