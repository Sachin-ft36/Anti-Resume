export const auth = {
    login: async (email, password) => {
      // Mock login - in a real app this would call an API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'demo@example.com' && password === 'password') {
            resolve({
              id: '123',
              email: 'demo@example.com',
              name: 'Demo User',
              token: 'mock-jwt-token'
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 500);
      });
    },
    
    register: async (userData) => {
      // Mock register - in a real app this would call an API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: '123',
            email: userData.email,
            name: userData.name
          });
        }, 500);
      });
    }
  };
  