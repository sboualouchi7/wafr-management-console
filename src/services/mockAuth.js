/**
 * Service d'authentification simulé pour le MVP
 * Version améliorée avec meilleure persistance
 */

// Utilisateur de démonstration
const mockUser = {
    uid: 'mock-user-1',
    email: 'admin@wafr.com',
    displayName: 'Admin User',
    photoURL: 'https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff'
  };
  
  // État d'authentification simulé
  let isAuthenticated = false;
  
  // Tentative de restauration de l'état d'authentification
  try {
    const savedAuth = localStorage.getItem('mockAuthState');
    if (savedAuth === 'true') {
      console.log('Restored auth state from localStorage');
      isAuthenticated = true;
    }
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }
  
  /**
   * Simule la connexion avec email/mot de passe
   */
  export const signInWithEmailAndPassword = (auth, email, password) => {
    return new Promise((resolve, reject) => {
      console.log(`MockAuth: Attempting login with ${email}`);
      setTimeout(() => {
        if (email === 'admin@wafr.com' && password === 'password123') {
          console.log('MockAuth: Login successful');
          isAuthenticated = true;
          try {
            localStorage.setItem('mockAuthState', 'true');
          } catch (e) {
            console.error('Error saving to localStorage:', e);
          }
          resolve({ 
            user: {
              ...mockUser,
              email: email
            } 
          });
        } else {
          console.log('MockAuth: Login failed - invalid credentials');
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };
  
  /**
   * Simule la connexion avec Google
   */
  export const signInWithPopup = (auth, provider) => {
    return new Promise((resolve) => {
      console.log('MockAuth: Attempting Google login');
      setTimeout(() => {
        const googleUser = {
          ...mockUser,
          email: 'admin.google@wafr.com',
          displayName: 'Admin Google User',
          providerData: [{ providerId: 'google.com' }]
        };
        isAuthenticated = true;
        try {
          localStorage.setItem('mockAuthState', 'true');
        } catch (e) {
          console.error('Error saving to localStorage:', e);
        }
        console.log('MockAuth: Google login successful');
        resolve({ user: googleUser });
      }, 500);
    });
  };
  
  /**
   * Simule la déconnexion
   */
  export const signOut = () => {
    return new Promise((resolve) => {
      console.log('MockAuth: Logging out');
      setTimeout(() => {
        isAuthenticated = false;
        try {
          localStorage.removeItem('mockAuthState');
        } catch (e) {
          console.error('Error removing from localStorage:', e);
        }
        console.log('MockAuth: Logout successful');
        resolve();
      }, 300);
    });
  };
  
  /**
   * Simule la vérification de l'état d'authentification
   */
  export const onAuthStateChanged = (auth, callback) => {
    console.log('MockAuth: Setting up auth state listener, current state:', isAuthenticated);
    
    // Appelle immédiatement le callback avec l'état actuel
    if (isAuthenticated) {
      console.log('MockAuth: User is authenticated');
      callback(mockUser);
    } else {
      console.log('MockAuth: User is not authenticated');
      callback(null);
    }
    
    // Fonction de nettoyage
    return () => {
      console.log('MockAuth: Cleaning up auth state listener');
    };
  };
  
  // Simule le provider Google
  export const googleProvider = {};
  
  // Objet auth fictif
  export const auth = {};