import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';
import EditUser from './pages/EditUser';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* User Management Routes */}
          <Route path="/users" element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          } />
          
          <Route path="/users/:userId" element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/users/edit/:userId" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
          
          <Route path="/users/new" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}

export default App;