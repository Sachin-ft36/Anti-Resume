import axios from 'axios';

const API_URL = 'https://api.antiresume.example.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Fixed Bearer token syntax
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const challengeService = {
  getChallenges: async () => {
    return [
      {
        id: '1',
        title: 'Problem Statement: Build a Dynamic Todo List Application',
        description: `Create a Dynamic Todo List Application.
        
You are tasked with building a simple Todo List application using React. The application should allow users to perform the following actions:

- Add new todo items
- Mark items as complete
- Delete items
- Filter todos by completion status`,
        difficulty: 'Intermediate',
        timeEstimate: '45 minutes',
        tags: ['React', 'Debugging', 'Hooks']
      },
      {
        id: '2',
        title: 'Design a User Dashboard',
        description: `Create a responsive dashboard for a health tracking app.
        
Requirements:
- Use cards and charts to display key metrics
- Implement dark mode toggle
- Ensure responsiveness across devices`,
        difficulty: 'Advanced',
        timeEstimate: '2 hours',
        tags: ['UI/UX', 'Design', 'Responsive']
      },
      {
        id: '3',
        title: 'Optimize Database Query',
        description: `This SQL query is taking too long. Make it more efficient.
        
Original Query:
SELECT * FROM users WHERE name LIKE '%John%' AND age > 25;

Optimize it to run faster on a large dataset.`,
        difficulty: 'Expert',
        timeEstimate: '1 hour',
        tags: ['SQL', 'Database', 'Optimization']
      }
    ];
  },

  getChallengeById: async (id) => {
    const challenges = await challengeService.getChallenges();
    return challenges.find(challenge => challenge.id === id);
  },

  // ✅ Realistic Evaluation by Challenge
  submitChallenge: async (id, solution) => {
    const errors = [];

    if (id === '1') {
      // React Todo App Evaluation
      if (!solution.includes('return')) {
        errors.push({ line: 2, message: 'Missing return statement in component.' });
      }
      if (!solution.includes('map')) {
        errors.push({ line: 5, message: 'Todo list should render using map().' });
      }
      if (!solution.includes('useState')) {
        errors.push({ line: 1, message: 'useState hook not used for state management.' });
      }
    }

    else if (id === '2') {
      // UI Dashboard Evaluation
      if (!solution.includes('darkMode')) {
        errors.push({ line: 3, message: 'Missing dark mode toggle implementation.' });
      }
      if (!solution.includes('Chart') && !solution.includes('chart.js')) {
        errors.push({ line: 6, message: 'Charts for metrics are not included.' });
      }
      if (!solution.includes('media') && !solution.includes('responsive')) {
        errors.push({ line: 9, message: 'No media queries or responsive design detected.' });
      }
    }

    else if (id === '3') {
      // SQL Query Evaluation
      if (!solution.toLowerCase().includes('index')) {
        errors.push({ line: 1, message: 'Consider adding an index to speed up LIKE queries.' });
      }
      if (solution.includes('*')) {
        errors.push({ line: 2, message: 'Avoid SELECT * — specify columns for better performance.' });
      }
    }

    return {
      success: errors.length === 0,
      score: errors.length === 0 ? 100 : Math.max(30, 100 - errors.length * 20),
      message: errors.length === 0 ? 'Correct output!' : 'Your solution has some issues.',
      errors
    };
  }
};

export const profileService = {
  getProfile: async () => {
    return {
      name: 'Sandeep',
      email: 'sandeep@gmail.com',
      completedChallenges: 12,
      skillScores: {
        'JavaScript': 85,
        'React': 92,
        'Node.js': 78,
        'Problem Solving': 88
      },
      jobFitScore: 91,
      matches: [
        { company: 'TechCorp', matchPercentage: 94 },
        { company: 'StartupX', matchPercentage: 88 },
        { company: 'DevAgency', matchPercentage: 76 }
      ]
    };
  },

  updateProfile: async (profileData) => {
    return { success: true };
  }
};

export default api;
