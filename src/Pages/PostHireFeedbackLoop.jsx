import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBar, Users, Briefcase, CheckCircle, 
  Clock, TrendingUp, CheckSquare, BadgeCheck,
  BarChart4, Building, CalendarClock, LineChart,
  ChevronRight
} from 'lucide-react';

export function PostHireFeedbackLoop() {
  const [activeView, setActiveView] = useState('candidates');
  const [feedbackPeriod, setFeedbackPeriod] = useState('30');
  const [expandedRow, setExpandedRow] = useState(null);
  
  const feedbackMetrics = {
    skillMatchAccuracy: 92,
    cultureFitAccuracy: 87,
    retentionRate: 94,
    performanceVsPrediction: 89
  };
  
  const recentMatches = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechVision",
      skillMatch: 95,
      cultureMatch: 88,
      status: "3 month review completed",
      feedback: "Excellent technical skills. Onboarding time was 30% shorter than average.",
      detailedFeedback: "Candidate has shown exceptional proficiency in React and modern JavaScript frameworks. Their ability to quickly integrate with our existing codebase and implement new features was impressive. Team members have reported positive collaboration experiences."
    },
    {
      id: 2,
      role: "UX Designer",
      company: "CreativeWorks",
      skillMatch: 89,
      cultureMatch: 94,
      status: "6 month review pending",
      feedback: "Strong collaboration skills. Design system contributions exceeded expectations.",
      detailedFeedback: "Designer has demonstrated strong user-centered design principles and excellent collaboration with the development team. Their contributions to our design system have standardized our approach and improved consistency across products."
    },
    {
      id: 3,
      role: "Data Scientist",
      company: "AnalyticMinds",
      skillMatch: 97,
      cultureMatch: 82,
      status: "1 month review completed",
      feedback: "Technical expertise matches perfectly. Some adaptation to team culture in progress.",
      detailedFeedback: "Candidate exhibits exceptional technical skills in machine learning and statistical analysis. While they're still adapting to our collaborative workflow processes, their technical contributions have already had measurable impact on our predictive models."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <section className="bg-white rounded-xl shadow-xl p-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-8"
      >
        <div className="bg-indigo-100 p-3 rounded-xl mr-4">
          <ChartBar className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Post-Hire Feedback Loop</h2>
      </motion.div>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <motion.div 
          className="tabs flex bg-gray-100 p-1 rounded-lg mb-4 md:mb-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <button 
            className={`relative px-6 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
              activeView === 'candidates' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => handleViewChange('candidates')}
          >
            {activeView === 'candidates' && (
              <motion.div 
                className="absolute inset-0 bg-indigo-600 rounded-lg z-0"
                layoutId="activeViewBackground"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              For Candidates
            </span>
          </button>
          <button 
            className={`relative px-6 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
              activeView === 'companies' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => handleViewChange('companies')}
          >
            {activeView === 'companies' && (
              <motion.div 
                className="absolute inset-0 bg-indigo-600 rounded-lg z-0"
                layoutId="activeViewBackground"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              <Building className="h-4 w-4 mr-2" />
              For Companies
            </span>
          </button>
        </motion.div>
        
        <motion.div 
          className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm pl-3 pr-1 py-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <span className="text-sm text-gray-600 mr-2 flex items-center">
            <CalendarClock className="h-4 w-4 mr-1 text-gray-400" />
            Feedback period:
          </span>
          <select 
            className="border-none focus:ring-0 focus:outline-none text-sm font-medium text-gray-800 pl-1 pr-6 py-1 rounded appearance-none bg-transparent"
            value={feedbackPeriod}
            onChange={(e) => setFeedbackPeriod(e.target.value)}
          >
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 6 months</option>
            <option value="365">Last year</option>
          </select>
        </motion.div>
      </div>
      
      {activeView === 'candidates' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl mb-8 border border-indigo-100"
          >
            <h3 className="text-xl font-bold mb-4 text-indigo-800">How Feedback Helps You</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our feedback loop continuously improves your job matches by analyzing performance data after hiring.
              This helps us refine our matching algorithm to better align your skills with the right opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-white p-5 rounded-lg shadow-md"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -10px rgba(79, 70, 229, 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800">Skill Development Insights</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Based on post-hire feedback, we identify specific skills to develop that would increase your match quality by 35%.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-5 rounded-lg shadow-md"
                whileHover={{ y: -4, boxShadow: "0 12px 20px -10px rgba(79, 70, 229, 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800">Career Path Optimization</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Performance data helps identify future career paths where others with similar skill profiles have excelled.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Your Recent Matches</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {recentMatches.length} matches
              </span>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Quality</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentMatches.map((match) => (
                    <>
                      <motion.tr 
                        key={match.id}
                        className={`hover:bg-gray-50 cursor-pointer ${expandedRow === match.id ? 'bg-indigo-50' : ''}`}
                        onClick={() => toggleRowExpansion(match.id)}
                        whileHover={{ backgroundColor: 'rgba(238, 242, 255, 0.5)' }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-lg text-indigo-600">
                              {match.role.substring(0, 2)}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{match.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="font-medium">{match.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 w-14">Skills</span>
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-green-500 rounded-full" 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${match.skillMatch}%` }}
                                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                                ></motion.div>
                              </div>
                              <span className="ml-2 text-xs font-medium">{match.skillMatch}%</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 w-14">Culture</span>
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-indigo-500 rounded-full" 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${match.cultureMatch}%` }}
                                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                                ></motion.div>
                              </div>
                              <span className="ml-2 text-xs font-medium">{match.cultureMatch}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {match.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{match.feedback}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <motion.div
                            animate={{ rotate: expandedRow === match.id ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </td>
                      </motion.tr>
                      {expandedRow === match.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan="6" className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
                            <div className="text-sm text-gray-700">
                              <h4 className="font-medium text-indigo-800 mb-2">Detailed Feedback:</h4>
                              <p className="ml-4 leading-relaxed">{match.detailedFeedback}</p>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {activeView === 'companies' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-2 bg-green-500"></div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-700">Skill Match Accuracy</h4>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-sm text-gray-600">
                    Predicted technical fit accuracy
                  </p>
                  <motion.div 
                    className="text-3xl font-bold text-green-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {feedbackMetrics.skillMatchAccuracy}%
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-2 bg-indigo-500"></div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-gray-700">Culture Fit Accuracy</h4>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-sm text-gray-600">
                    Team integration prediction
                  </p>
                  <motion.div 
                    className="text-3xl font-bold text-indigo-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {feedbackMetrics.cultureFitAccuracy}%
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-2 bg-purple-500"></div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-700">6-Month Retention</h4>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-sm text-gray-600">
                    Long-term success rate
                  </p>
                  <motion.div 
                    className="text-3xl font-bold text-purple-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {feedbackMetrics.retentionRate}%
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-2 bg-amber-500"></div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 p-2 rounded-lg mr-3">
                    <LineChart className="h-5 w-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-700">Performance Score</h4>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-sm text-gray-600">
                    Actual vs. predicted alignment
                  </p>
                  <motion.div 
                    className="text-3xl font-bold text-amber-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {feedbackMetrics.performanceVsPrediction}%
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-800">How We Use Your Feedback</h3>
            <div className="space-y-6">
              <motion.div 
                className="flex bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Collect Performance Data</h4>
                  <p className="text-gray-600 mt-1">
                    Regular check-ins at 30, 90, and 180 days gather structured feedback on candidate performance
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Refine Matching Algorithm</h4>
                  <p className="text-gray-600 mt-1">
                    Our AI refines its understanding of both hard skills and soft skills needed for success
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Improve Culture Matching</h4>
                  <p className="text-gray-600 mt-1">
                    Post-hire insights help us better understand your unique company culture and work environment
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Provide Hiring Insights</h4>
                  <p className="text-gray-600 mt-1">
                    Detailed analytics help you understand which types of candidates succeed in your organization
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Ready to Improve Your Hiring?</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Our team will guide you through the feedback process to enhance future candidate matches
            </p>
            <motion.button 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Feedback Session
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}