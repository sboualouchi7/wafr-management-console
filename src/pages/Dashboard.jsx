import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { getUserStats } from '../services/users';
// Ajoutez cet import en haut de votre fichier Dashboard.jsx
import { FiHome, FiUsers, FiSettings, FiUserCheck, FiUserX, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalBalance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, bgColor, textColor, subtext }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`rounded-lg p-3 ${bgColor}`}>
            {icon}
          </div>
          <div className="ml-5">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className={`mt-1 text-2xl font-semibold ${textColor}`}>{value}</p>
            {subtext && <p className="mt-1 text-xs text-gray-500">{subtext}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, to, bgColor }) => (
    <a
      href={to}
      className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
    >
      <div className="flex items-start">
        <div className={`rounded-lg p-3 ${bgColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </a>
  );

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-1 text-gray-600">Welcome back to the WafR Management Console</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <FiTrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </button>
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<FiUsers className="h-6 w-6 text-blue-500" />}
              bgColor="bg-blue-100"
              textColor="text-blue-700"
              subtext="All registered accounts"
            />
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<FiUserCheck className="h-6 w-6 text-green-500" />}
              bgColor="bg-green-100"
              textColor="text-green-700"
              subtext="Currently active accounts"
            />
            <StatCard
              title="Blocked Users"
              value={stats.blockedUsers}
              icon={<FiUserX className="h-6 w-6 text-red-500" />}
              bgColor="bg-red-100"
              textColor="text-red-700"
              subtext="Suspended accounts"
            />
            <StatCard
              title="Total Balance"
              value={`${stats.totalBalance.toFixed(2)} MAD`}
              icon={<FiDollarSign className="h-6 w-6 text-yellow-500" />}
              bgColor="bg-yellow-100"
              textColor="text-yellow-700"
              subtext="Combined user balances"
            />
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
              <p className="text-sm text-gray-500">Latest system events and user actions</p>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center py-3 border-b border-gray-100">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiUserCheck className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">New user registered</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center py-3 border-b border-gray-100">
                <div className="bg-green-100 p-2 rounded-full">
                  <FiDollarSign className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Transaction completed</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <FiUserX className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">User account blocked</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuickAction
                title="Manage Users"
                description="Search and manage user accounts"
                icon={<FiUsers className="h-6 w-6 text-white" />}
                to="/users"
                bgColor="bg-blue-500"
              />
              <QuickAction
                title="Transaction Reports"
                description="Generate and export transaction reports"
                icon={<FiActivity className="h-6 w-6 text-white" />}
                to="/reports"
                bgColor="bg-purple-500"
              />
              <QuickAction
                title="System Settings"
                description="Configure platform settings"
                icon={<FiSettings className="h-6 w-6 text-white" />}
                to="/settings"
                bgColor="bg-gray-700"
              />
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Dashboard;