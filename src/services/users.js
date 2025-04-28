// Mock data for MVP
const mockUsers = [
    {
      id: '1',
      name: 'Mohammed Alami',
      phone: '0612345678',
      email: 'malami@example.com',
      balance: 1250.75,
      status: 'active',
      registeredOn: '2023-09-15',
      transactions: [
        { id: 't1', date: '2024-04-22', amount: 250.00, type: 'deposit', status: 'completed' },
        { id: 't2', date: '2024-04-20', amount: -75.50, type: 'withdrawal', status: 'completed' },
        { id: 't3', date: '2024-04-15', amount: 500.00, type: 'deposit', status: 'completed' },
      ]
    },
    {
      id: '2',
      name: 'Fatima Benali',
      phone: '0698765432',
      email: 'fbenali@example.com',
      balance: 3450.25,
      status: 'active',
      registeredOn: '2023-10-05',
      transactions: [
        { id: 't4', date: '2024-04-25', amount: 1000.00, type: 'deposit', status: 'completed' },
        { id: 't5', date: '2024-04-18', amount: -250.75, type: 'withdrawal', status: 'completed' },
        { id: 't6', date: '2024-04-10', amount: 750.50, type: 'deposit', status: 'completed' },
      ]
    },
    {
      id: '3',
      name: 'Karim Idrissi',
      phone: '0654321987',
      email: 'kidrissi@example.com',
      balance: 780.30,
      status: 'blocked',
      registeredOn: '2023-11-20',
      transactions: [
        { id: 't7', date: '2024-04-15', amount: 300.00, type: 'deposit', status: 'completed' },
        { id: 't8', date: '2024-04-12', amount: -50.00, type: 'withdrawal', status: 'completed' },
        { id: 't9', date: '2024-04-05', amount: 200.00, type: 'deposit', status: 'completed' },
      ]
    }
  ];
  
  // Search user by phone number
  export const searchUserByPhone = (phoneNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(user => user.phone.includes(phoneNumber));
        resolve(user || null);
      }, 500); // Simulate API delay
    });
  };
  
  // Get user details by ID
  export const getUserById = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(user => user.id === userId);
        resolve(user || null);
      }, 300);
    });
  };
  
  // Toggle user status (block/unblock)
  export const toggleUserStatus = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
          const updatedUser = { 
            ...mockUsers[userIndex],
            status: mockUsers[userIndex].status === 'active' ? 'blocked' : 'active' 
          };
          mockUsers[userIndex] = updatedUser;
          resolve(updatedUser);
        } else {
          resolve(null);
        }
      }, 300);
    });
  };
  
  // Get all users (for dashboard summary)
  export const getAllUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500);
    });
  };
  
  // Get user statistics for dashboard
  export const getUserStats = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = {
          totalUsers: mockUsers.length,
          activeUsers: mockUsers.filter(user => user.status === 'active').length,
          blockedUsers: mockUsers.filter(user => user.status === 'blocked').length,
          totalBalance: mockUsers.reduce((total, user) => total + user.balance, 0)
        };
        resolve(stats);
      }, 300);
    });
  };