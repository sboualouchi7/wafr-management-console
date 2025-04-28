import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiMenu, FiX, FiUser, FiHome, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const MainLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />
    },
    {
      path: '/users',
      name: 'User Management',
      icon: <FiUsers className="w-5 h-5" />
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <FiSettings className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block md:w-64 bg-gray-800 flex-shrink-0">
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">WafR Admin</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="mt-5 px-2">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <span className="mr-3">
                <FiLogOut className="w-5 h-5" />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-600 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
              <h1 className="ml-2 text-xl font-semibold text-gray-800 md:hidden">WafR Admin</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-200 rounded-full">
                  <FiUser className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                  {currentUser?.email || 'Admin User'}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="mt-4 flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;