import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
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
    <div className="h-screen bg-gray-800 text-white w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-2xl font-bold">WafR Admin</h2>
      </div>
      
      <nav className="mt-5">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
          
          <li className="mt-10">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <span className="mr-3">
                <FiLogOut className="w-5 h-5" />
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;