import axios from 'axios';

const API_URL = 'https://api.antiresume.example.com'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const challengeService = {
  getChallenges: async () => {
    // Mock data for now
    return [
      { 
        id: '1', 
        title: 'Problem Statement: Build a Dynamic Todo List Application', 
        description: ' Create a Dynamic Todo List ApplicationYou are tasked with building a simple Todo List application using React. The application should allow users to perform the following actions:',
        difficulty: 'Intermediate',
        timeEstimate: '45 minutes',
        tags: ['React', 'Debugging', 'Hooks']
      },
      { 
        id: '2', 
        title: 'Design a User Dashboard', 
        description: 'Create a responsive dashboard for a health tracking app.',
        difficulty: 'Advanced',
        timeEstimate: '2 hours',
        tags: ['UI/UX', 'Design', 'Responsive']
      },
      { 
        id: '3', 
        title: 'Optimize Database Query', 
        description: 'This SQL query is taking too long. Make it more efficient.',
        difficulty: 'Expert',
        timeEstimate: '1 hour',
        tags: ['SQL', 'Database', 'Optimization']
      }
    ];
  },
  
  getChallengeById: async (id) => {
    // Mock data for now
    const challenges = await challengeService.getChallenges();
    return challenges.find(challenge => challenge.id === id);
  },
  
  submitChallenge: async (id, solution) => {
    // Mock API call
    return { success: true, score: 85 };
  }
};

export const profileService = {
  getProfile: async () => {
    // Mock data for now
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
    // Mock API call
    return { success: true };
  }
};

export default api;