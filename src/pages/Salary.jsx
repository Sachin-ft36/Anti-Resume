import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Star, ThumbsUp, ThumbsDown, Users, Coffee, Clock, 
  DollarSign, BookOpen, Heart, Briefcase, TrendingUp, Shield
} from 'lucide-react';



  
export function Salary() {
  const [activeTab, setActiveTab] = useState('salary');
  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  
  const salaryData = [
    { name: '25th Percentile', salary: 85000 },
    { name: 'Median', salary: 110000 },
    { name: '75th Percentile', salary: 135000 },
    { name: '90th Percentile', salary: 160000 },
  ];
  
  const cultureMetrics = {
    'Work-Life Balance': 4.2,
    'Learning Opportunities': 4.5,
    'Team Collaboration': 4.1,
    'Management Support': 3.8,
    'Diversity & Inclusion': 4.0,
    'Career Growth': 3.9
  };
  
  const cultureRadarData = Object.entries(cultureMetrics).map(([name, value]) => ({
    subject: name,
    A: value,
    fullMark: 5,
  }));
  
  const roles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'Marketing Specialist'
  ];

  
  return (
    <>
    
    <header className="py-25 bg-gradient-to-br from-[#F9F4FF] via-[#FDF3FB] to-[#F5E8FF] text-black mb-10 text-center overflow-hidden">
    <div className="max-w-5xl mx-auto px-4"  data-aos="fade-down"> 
      <h1
        className="text-5xl font-bold mb-4 max-md:text-4xl"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
         <span>Transparent </span>{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Company
        </span>{' '}
        <span>Data</span>
      </h1>


      <p
        className="text-xl pt-5 font-medium text-gray-700 max-md:text-xl"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Access verified company insights including salaries, feedback, and role-based expectations — all in one place. Make informed career decisions with complete transparency and grow with confidence.
      </p>
    </div>
  </header>
    <section className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto mb-9">
      
      {/* Role Selector */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
        <label htmlFor="role-select" className="block text-sm font-medium mb-2 text-gray-600">Looking at:</label>
        <div className="relative">
          <select 
            id="role-select"
            className="w-full p-3 pl-4 pr-10 bg-white border border-gray-200 rounded-lg shadow-sm appearance-none text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row mb-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
  <button 
    className={`flex items-center px-6 py-3 font-medium text-sm whitespace-nowrap transition-all ${
      activeTab === 'salary'
        ? 'text-indigo-600 border-b-2 border-indigo-600'
        : 'text-gray-500 hover:text-gray-800'
    }`}
    onClick={() => setActiveTab('salary')}
  >
    <DollarSign className="mr-2 h-4 w-4" />
    Compensation
  </button>
  
  <button 
    className={`flex items-center px-6 py-3 font-medium text-sm whitespace-nowrap transition-all ${
      activeTab === 'culture'
        ? 'text-indigo-600 border-b-2 border-indigo-600'
        : 'text-gray-500 hover:text-gray-800'
    }`}
    onClick={() => setActiveTab('culture')}
  >
    <Users className="mr-2 h-4 w-4" />
    Company Culture
  </button>
  
  <button 
    className={`flex items-center px-6 py-3 font-medium text-sm whitespace-nowrap transition-all ${
      activeTab === 'benefits'
        ? 'text-indigo-600 border-b-2 border-indigo-600'
        : 'text-gray-500 hover:text-gray-800'
    }`}
    onClick={() => setActiveTab('benefits')}
  >
    <Heart className="mr-2 h-4 w-4" />
    Benefits
  </button>
</div>

      
      {/* Tab Content */}
      <div className="min-h-64">
        {activeTab === 'salary' && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <DollarSign className="text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedRole} Compensation</h3>
                <p className="text-sm text-gray-500">Based on 247 verified reports</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-700">Salary Distribution</h4>
                  <p className="text-xs text-gray-500">All figures in USD, annually</p>
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-indigo-600 border border-indigo-100">
                  <span className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    15% above market
                  </span>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={salaryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{fill: '#6b7280'}} />
                  <YAxis tick={{fill: '#6b7280'}} />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Bar dataKey="salary" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <h4 className="font-medium mb-3 text-indigo-800">Salary Insights:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                  <div className="bg-green-100 p-1 rounded mr-3">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Employee Satisfaction</p>
                    <p className="text-sm text-gray-600">92% report satisfaction with compensation</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                  <div className="bg-indigo-100 p-1 rounded mr-3">
                    <Clock className="h-4 w-4 text-indigo-600" />  
                  </div>
                  <div>
                    <p className="font-medium text-sm">Regular Reviews</p>
                    <p className="text-sm text-gray-600">Salary reviews every 6 months</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                  <div className="bg-purple-100 p-1 rounded mr-3">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Performance Bonuses</p>
                    <p className="text-sm text-gray-600">Average 8-12% annually</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                  <div className="bg-blue-100 p-1 rounded mr-3">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Career Trajectory</p>
                    <p className="text-sm text-gray-600">Promotion opportunities every 18-24 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'culture' && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Users className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Company Culture</h3>
                <p className="text-sm text-gray-500">Based on anonymous employee surveys</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">              
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius={90} data={cultureRadarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#6b7280', fontSize: 12}} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{fill: '#6b7280'}} />
                  <Radar name="Company Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                  <Legend wrapperStyle={{paddingTop: '20px'}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center mb-4">
                  <ThumbsUp className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-bold text-green-800">What Employees Love</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <Star className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">Supportive team environment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <Star className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">Professional growth opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <Star className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">Transparent communication</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <div className="flex items-center mb-4">
                  <ThumbsDown className="h-5 w-5 text-amber-600 mr-2" />
                  <h4 className="font-bold text-amber-800">Areas for Improvement</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mr-2 mt-1">
                      <Clock className="h-3 w-3 text-amber-600" />
                    </div>
                    <span className="text-gray-700">Meeting efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mr-2 mt-1">
                      <Users className="h-3 w-3 text-amber-600" />
                    </div>
                    <span className="text-gray-700">Cross-department collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mr-2 mt-1">
                      <Briefcase className="h-3 w-3 text-amber-600" />
                    </div>
                    <span className="text-gray-700">Remote work policies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <Heart className="text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Comprehensive Benefits</h3>
                <p className="text-sm text-gray-500">Everything beyond your base salary</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="bg-indigo-600 p-4">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Work Environment</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Flexible work hours</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">3 remote days per week</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Modern office space</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Wellness rooms</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="bg-blue-600 p-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Time Off</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">25 days PTO annually</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">12 paid holidays</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Sabbatical after 5 years</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Parental leave: 16 weeks</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="bg-purple-600 p-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Development</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">$2,500 learning budget</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Conference attendance</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Mentorship program</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                      <span className="text-gray-600">Industry certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}