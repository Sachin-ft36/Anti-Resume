import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { challengeService } from '../../services/api';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await challengeService.getChallengeById(id);
        if (!data) {
          navigate('/challenges');
          return;
        }
        setChallenge(data);
      } catch (error) {
        console.error('Error fetching challenge:', error);
        navigate('/challenges');
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenge();
  }, [id, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!solution.trim()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const data = await challengeService.submitChallenge(id, solution);
      setResult(data);
    } catch (error) {
      console.error('Error submitting challenge:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{challenge.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                challenge.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">{challenge.timeEstimate}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {challenge.tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            
            <p className="text-gray-700 mb-6">{challenge.description}</p>
            
            <div className="bg-gray-50 p-4 rounded-md border mb-6">
              <h3 className="text-lg font-medium mb-2">Challenge Requirements</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solve the problem efficiently</li>
                <li>Include comments explaining your approach</li>
                <li>Ensure your solution handles edge cases</li>
                <li>Follow best practices for the given programming language or skill area</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-lg font-medium mb-2">Evaluation Criteria</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Correctness - Does your solution solve the problem as specified?</li>
                <li>Efficiency - Is your solution optimized?</li>
                <li>Readability - Is your code/solution clear and well-organized?</li>
                <li>Best Practices - Do you follow industry standards?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {result ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Challenge Results</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-lg font-medium text-green-800">Submission Successful</h3>
              </div>
              <p className="text-green-700">Your solution has been evaluated. Great job!</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Your Score</h3>
              <div className="flex items-center">
                <div className="text-5xl font-bold text-indigo-600 mr-2">{result.score}</div>
                <div className="text-2xl text-gray-500">/100</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Feedback</h3>
                <div className="bg-gray-50 p-4 rounded-md border">
                  <p className="text-gray-700">
                    {result.score >= 90 ? 
                      'Outstanding work! Your solution demonstrates exceptional problem-solving skills and attention to detail.' :
                     result.score >= 80 ?
                      'Great job! Your solution effectively addresses the challenge with good practices and clear implementation.' :
                     result.score >= 70 ?
                      'Good effort! Your solution works well, with some areas that could be optimized or improved.' :
                      'Nice attempt! Your solution shows understanding of the problem, but there are significant opportunities for improvement.'}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <p className="text-gray-700">
                  This score has been added to your profile. Continue completing challenges to improve your skills and job matches.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/challenges')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Challenges
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Solution</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="solution" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter your solution below:
                </label>
                <textarea
                  id="solution"
                  rows="12"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                  placeholder="// Write your solution here..."
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {submitting ? 'Submitting...' : 'Submit Solution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;