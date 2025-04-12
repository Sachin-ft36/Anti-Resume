import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, Upload, Briefcase, Building2, 
  MapPin, Check, CheckCircle2, FileText
} from "lucide-react";

const jobsData = {
  "1": {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechInnovate Inc.",
    location: "Remote",
    salary: "110,000 - 140,000",
    type: "Full-time",
    description: "Join our team to build modern, performant web applications using React.",
    requirements: [
      "5+ years of experience with modern JavaScript and React",
      "Strong understanding of state management",
      "Experience with TypeScript and modern build tools",
      "Background in responsive and accessible web apps"
    ]
  },
  "2": {
    id: 2,
    title: "UX Designer",
    company: "DesignMasters",
    location: "New York, NY",
    salary: "95,000 - 120,000",
    type: "Full-time",
    description: "We're looking for a talented UX Designer to create beautiful interfaces.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency with Figma or similar tools",
      "Portfolio showcasing design solutions",
      "Experience conducting user research"
    ]
  }
};

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  
  const job = id && jobsData[id] ? jobsData[id] : jobsData["1"];
  
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    coverletter: "",
    resumeFile: null,
    availableStart: "",
    salaryExpectation: "",
    agreeToTerms: false
  });
  
  const handleInputChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value
    });
    
    const requiredFields = ['fullName', 'email', 'phone', 'resumeFile', 'coverletter', 'agreeToTerms'];
    const filledRequiredFields = requiredFields.filter(field => 
      formState[field]
    );
    setProgress((filledRequiredFields.length / requiredFields.length) * 100);
  };
  
  const handleFileUpload = (event, fieldName) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFormState({
        ...formState,
        [fieldName]: files[0].name
      });
    }
  };
  
  const handleNext = () => {
    if (activeTab === "info") setActiveTab("resume");
    else if (activeTab === "resume") setActiveTab("questions");
    else if (activeTab === "questions") setActiveTab("review");
  };
  
  const handleBack = () => {
    if (activeTab === "resume") setActiveTab("info");
    else if (activeTab === "questions") setActiveTab("resume");
    else if (activeTab === "review") setActiveTab("questions");
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate("/jobs")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Thank you for applying to the {job.title} position at {job.company}.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => navigate("/jobs")}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Browse More Jobs
                </button>
                <button 
                  onClick={() => navigate("/challenges")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Explore Challenges
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                    <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <Building2 size={16} className="mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center mr-4">
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center mr-4">
                        <Briefcase size={16} className="mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <span className="mt-2 lg:mt-0 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Application in progress
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b">
                  <div className="px-6 pt-6">
                    <div className="grid grid-cols-4 gap-1 mb-4">
                      <button
                        onClick={() => setActiveTab("info")}
                        className={`py-2 text-sm font-medium ${activeTab === "info" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                      >
                        Personal Info
                      </button>
                      <button
                        onClick={() => setActiveTab("resume")}
                        className={`py-2 text-sm font-medium ${activeTab === "resume" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                      >
                        Resume & CV
                      </button>
                      <button
                        onClick={() => setActiveTab("questions")}
                        className={`py-2 text-sm font-medium ${activeTab === "questions" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                      >
                        Questions
                      </button>
                      <button
                        onClick={() => setActiveTab("review")}
                        className={`py-2 text-sm font-medium ${activeTab === "review" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
                
                {activeTab === "info" && (
                  <>
                    <div className="p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formState.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formState.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formState.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Current Location
                          </label>
                          <input
                            type="text"
                            value={formState.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="City, State, Country"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          value={formState.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 border-t flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
                
                {activeTab === "resume" && (
                  <>
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Resume / CV <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            Upload your resume or CV (PDF, DOC, or DOCX)
                          </p>
                          {formState.resumeFile ? (
                            <div className="flex items-center justify-center text-green-600">
                              <Check className="h-4 w-4 mr-2" />
                              <span className="text-sm">{formState.resumeFile}</span>
                            </div>
                          ) : (
                            <input
                              type="file"
                              className="hidden"
                              id="resume"
                              onChange={(e) => handleFileUpload(e, 'resumeFile')}
                              accept=".pdf,.doc,.docx"
                            />
                          )}
                          <label
                            htmlFor="resume"
                            className="inline-block mt-3 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            {formState.resumeFile ? "Replace File" : "Select File"}
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Cover Letter <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={6}
                          value={formState.coverletter}
                          onChange={(e) => handleInputChange('coverletter', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tell us why you're interested in this position"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 border-t flex justify-between">
                      <button
                        onClick={handleBack}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
                
                {activeTab === "questions" && (
                  <>
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          When can you start?
                        </label>
                        <input
                          type="text"
                          value={formState.availableStart}
                          onChange={(e) => handleInputChange('availableStart', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Immediately, 2 weeks notice"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Salary Expectations
                        </label>
                        <input
                          type="text"
                          value={formState.salaryExpectation}
                          onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., $90,000 - $110,000 per year"
                        />
                      </div>
                      
                      <div className="space-y-4 pt-4">
                        <h3 className="font-semibold">Job Requirements</h3>
                        <div className="bg-gray-50 rounded-md p-4 space-y-3">
                          {job.requirements.map((req, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={formState.agreeToTerms}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium text-gray-700"
                          >
                            I confirm that the information provided is accurate <span className="text-red-500">*</span>
                          </label>
                          <p className="text-sm text-gray-500">
                            By submitting this application, you agree to our privacy policy.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 border-t flex justify-between">
                      <button
                        onClick={handleBack}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formState.agreeToTerms}
                        className={`px-4 py-2 rounded-md flex items-center ${formState.agreeToTerms ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                      >
                        Review Application <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
                
                {activeTab === "review" && (
                  <>
                    <div className="p-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-4">
                          <FileText className="h-5 w-5 text-gray-600 mr-2" />
                          <h3 className="font-semibold">Application Summary</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p className="font-medium">{formState.fullName || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{formState.email || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{formState.phone || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Resume</p>
                              <p className="font-medium">{formState.resumeFile || "Not uploaded"}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Cover Letter</p>
                            <p className="whitespace-pre-line mt-1">
                              {formState.coverletter || "Not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          Please review your application carefully before submitting.
                        </p>
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 border-t flex justify-between">
                      <button
                        onClick={handleBack}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formState.agreeToTerms}
                        className={`px-4 py-2 rounded-md flex items-center ${formState.agreeToTerms ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                      >
                        Submit Application
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2023 JobBoard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ApplyJob;