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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Welcome{currentUser?.name ? `, ${currentUser.name}` : ''} 
        </h1>
        <p className="text-lg text-gray-600 mt-2">Show your skills, not your story. Let's find your perfect match.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-semibold mb-2">Job Fit Score</h2>
          <div className="text-5xl font-bold">{profile.jobFitScore}%</div>
          <p className="mt-2">Based on your challenge results</p>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-semibold mb-2">Challenges Completed</h2>
          <div className="text-5xl font-bold">{profile.completedChallenges}</div>
          <p className="mt-2">Keep going to improve your score!</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-pink-500 p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-semibold mb-2">Top Company Match</h2>
          {profile.matches.slice(0, 1).map((match, index) => (
            <div key={index} className="flex justify-between items-center text-lg font-medium mb-2">
              <span>{match.company}</span>
              <span className="text-green-200 font-bold">{match.matchPercentage}%</span>
            </div>
          ))}
          <Link to="/profile" className="underline text-sm text-white">View all matches</Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recommended Challenges</h2>
          <Link to="/challenges" className="text-indigo-600 hover:underline">View all</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.slice(0, 2).map(challenge => (
            <div key={challenge.id} className="p-6 bg-gray-50 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{challenge.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{challenge.difficulty}</span>
                <span className="text-gray-500 text-xs">{challenge.timeEstimate}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <Link 
                to={`/challenges/${challenge.id}`}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                🚀 Take Challenge
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Skill Graph</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profile.skillScores).map(([skill, score]) => (
            <div key={skill}>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{skill}</span>
                <span>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
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
