import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { challengeService } from '../../services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      duration: 1000, // Optional: Customize animation duration
      once: true, // Ensures the animation only triggers once
    });

    const fetchChallenges = async () => {
      try {
        console.log('Fetching challenges...');
        const data = await challengeService.getChallenges();
        console.log('Fetched data:', data);
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter !== 'all' && challenge.difficulty.toLowerCase() !== filter.toLowerCase()) return false;
    if (
      search &&
      !challenge.title.toLowerCase().includes(search.toLowerCase()) &&
      !challenge.description.toLowerCase().includes(search.toLowerCase()) &&
      !challenge.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 pb-10">
      <div>
        {/* Centered Header Section */}
        <header className="py-25 bg-gradient-to-br from-[#F9F4FF] via-[#FDF3FB] to-[#F5E8FF] text-black mb-10 text-center overflow-hidden">
          <div className="max-w-5xl mx-auto px-4"  data-aos="fade-down"> 
            <h1
              className="text-5xl font-bold mb-4 max-md:text-4xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <span className="text-black">Skill</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Challenges
              </span>
            </h1>

            <p
              className="text-2xl font-medium text-gray-700 max-md:text-xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Sharpen your skills, complete challenges & upgrade your profile
            </p>
          </div>
        </header>

        {/* Filter and Search Box */}
        <div className="p-6 mb-12 mx-10 rounded-3xl border border-gray-200 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search with Icon */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                placeholder="Search challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 bg-white/60 backdrop-blur-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-4.35-4.35M10.5 16.5a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Difficulty Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Difficulty:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 bg-white/60 backdrop-blur-sm focus:ring-indigo-400"
              >
                <option value="all">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="text-center text-gray-600 py-20">Loading...</div>
        ) : (
          // Challenge Cards
          <div>
            {filteredChallenges.length === 0 ? (
              <div className="text-center text-gray-600 py-20">
                No challenges found matching your criteria.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
                {filteredChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 transition transform hover:scale-[1.03] hover:shadow-2xl"
                  >
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">{challenge.title}</h3>
                    <p className="text-gray-700 mb-4">{challenge.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          challenge.difficulty === 'Beginner'
                            ? 'bg-green-100 text-green-700'
                            : challenge.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : challenge.difficulty === 'Advanced'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{challenge.timeEstimate}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {challenge.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/challenges/${challenge.id}`}
                      className="inline-block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View Challenge
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;
