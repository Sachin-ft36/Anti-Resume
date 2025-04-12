import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { challengeService } from '../../services/api';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengeService.getChallenges();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenges();
  }, []);
  
  const filteredChallenges = challenges.filter(challenge => {
    // Filter by difficulty
    if (filter !== 'all' && challenge.difficulty.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    
    // Filter by search term
    if (search && !challenge.title.toLowerCase().includes(search.toLowerCase()) && 
        !challenge.description.toLowerCase().includes(search.toLowerCase()) &&
        !challenge.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
  
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
        <h1 className="text-3xl font-bold text-gray-900">Skill Challenges</h1>
        <p className="text-gray-600 mt-2">Complete challenges to showcase your skills and improve your job fit score</p>
      </header>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search challenges..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Filter:</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
        
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No challenges found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChallenges.map(challenge => (
              <div key={challenge.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">{challenge.title}</h3>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    challenge.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-gray-500 text-sm">{challenge.timeEstimate}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {challenge.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                
                <Link 
                  to={`/challenges/${challenge.id}`}
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                >
                  View Challenge
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;