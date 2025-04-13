import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { challengeService } from '../../services/api';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const validateSolution = (solution) => {
    const isCode = /[a-zA-Z0-9]/.test(solution) && solution.includes('function');
    return isCode;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solution.trim()) {
      setErrorMessage('Solution cannot be empty!');
      return;
    }

    if (!validateSolution(solution)) {
      setErrorMessage('Please enter valid code (e.g., JavaScript function)');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto py-10 px-6 text-white ">
        <div className="bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-700 p-8 mb-10">
          <h1 className="text-4xl font-bold mb-6 text-indigo-400">{challenge.title}</h1>

          <div className="flex flex-wrap gap-3 mb-4">
            <span className={`text-sm px-4 py-1 rounded-full font-semibold ${
              challenge.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
              challenge.difficulty === 'Intermediate' ? 'bg-yellow-800 text-yellow-200' :
              challenge.difficulty === 'Advanced' ? 'bg-orange-800 text-orange-200' :
              'bg-red-900 text-red-300'
            }`}>
              {challenge.difficulty}
            </span>
            <span className="text-sm bg-gray-700 text-gray-300 px-4 py-1 rounded-full font-semibold">
              {challenge.timeEstimate}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {challenge.tags.map((tag, index) => (
              <span key={index} className="bg-indigo-700 text-white text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose max-w-none prose-invert mb-6">
            <ReactMarkdown
              children={challenge.description}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-800 text-red-300 px-1 py-0.5 rounded" {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#2d2d2d] p-5 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">Challenge Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Solve the problem efficiently</li>
                <li>Include comments explaining your approach</li>
                <li>Ensure your solution handles edge cases</li>
                <li>Follow best practices for the given programming language</li>
              </ul>
            </div>

            <div className="bg-[#2d2d2d] p-5 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">Evaluation Criteria</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Correctness</li>
                <li>Efficiency</li>
                <li>Readability</li>
                <li>Best Practices</li>
              </ul>
            </div>
          </div>
        </div>

        {result ? (
          <div className="bg-[#1e1e1e] rounded-xl shadow-xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-green-400 mb-6">Challenge Results</h2>
            {result.success ? (
              <div className="bg-green-900 border border-green-700 rounded-md p-5 mb-6 text-green-200">
                <h3 className="text-lg font-bold mb-2">Submission Successful</h3>
                <p>Your solution has been evaluated. Great job!</p>
              </div>
            ) : (
              <div className="bg-red-900 border border-red-700 rounded-md p-5 mb-6 text-red-200">
                <h3 className="text-lg font-bold mb-2">Errors Found</h3>
                <ul className="text-sm space-y-1">
                  {result.errors?.map((err, index) => (
                    <li key={index}>
                      <strong>Line {err.line}:</strong> {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Your Score</h3>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold text-indigo-400">{result.score}</span>
                <span className="text-2xl text-gray-400">/100</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Feedback</h3>
              <div className="bg-gray-800 border border-gray-700 rounded-md p-4 text-gray-300">
                {result.score >= 90 ? 'Outstanding work!' :
                  result.score >= 80 ? 'Great job!' :
                  result.score >= 70 ? 'Good effort!' : 'Nice attempt!'}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate('/challenges')}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
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
        ) : (
          <div className="bg-[#1e1e1e] rounded-xl shadow-xl p-8 border border-gray-700">
            <h2 className="text-3xl font-semibold text-indigo-300 mb-6">Code Your Solution</h2>

            {errorMessage && <div className="text-red-400 mb-4">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="solution" className="block text-sm font-medium mb-2 text-gray-300">
                  Write your code:
                </label>
                <textarea
                  id="solution"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  rows="12"
                  placeholder="// Start coding here..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Solution'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

  
    </div>
  );
};

export default ChallengeDetail;
