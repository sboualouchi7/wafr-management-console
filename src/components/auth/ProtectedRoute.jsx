import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  
  // Ajouter un log pour le débogage
  useEffect(() => {
    console.log('ProtectedRoute - currentUser:', currentUser);
    // Attendre un court instant pour s'assurer que l'état d'authentification est à jour
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentUser]);
  
  // Afficher un spinner pendant la vérification
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!currentUser) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  console.log('User authenticated, rendering protected content');
  return children;
};

export default ProtectedRoute;