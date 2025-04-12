import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { challengeService, profileService } from '../../services/api';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [challengesData, profileData] = await Promise.all([
          challengeService.getChallenges(),
          profileService.getProfile()
        ]);
        
        setChallenges(challengesData);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser.name}!</h1>
        <p className="text-gray-600 mt-2">Show your skills, not your story. Let's find your perfect match.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Your Job Fit Score</h2>
          <div className="text-5xl font-bold text-indigo-600">{profile.jobFitScore}%</div>
          <p className="text-gray-600 mt-2">Based on your challenge results</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Challenges Completed</h2>
          <div className="text-5xl font-bold text-indigo-600">{profile.completedChallenges}</div>
          <p className="text-gray-600 mt-2">Keep going to improve your score!</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Top Companies Match</h2>
          {profile.matches.slice(0, 1).map((match, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="font-medium">{match.company}</span>
              <span className="text-green-600 font-bold">{match.matchPercentage}%</span>
            </div>
          ))}
          <Link to="/profile" className="text-indigo-600 text-sm hover:underline">View all matches</Link>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recommended Challenges</h2>
          <Link to="/challenges" className="text-indigo-600 hover:underline">View all</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.slice(0, 2).map(challenge => (
            <div key={challenge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">{challenge.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">{challenge.difficulty}</span>
                <span className="text-gray-500 text-xs">{challenge.timeEstimate}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <Link 
                to={`/challenges/${challenge.id}`}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
              >
                Take Challenge
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Skill Graph</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profile.skillScores).map(([skill, score]) => (
            <div key={skill} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{skill}</span>
                <span>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
