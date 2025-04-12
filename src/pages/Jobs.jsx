import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Building2, Search, Briefcase, Filter } from "lucide-react";


const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechInnovate Inc.",
    companyId: "TI",
    location: "Remote",
    salary: "110,000 - 140,000",
    type: "Full-time",
    culture: ["Remote-first", "Flexible hours", "Learning stipend"],
    skills: ["React", "TypeScript", "GraphQL"],
    description: "Join our team to build modern, performant web applications using React. You'll work on challenging problems and contribute to open-source projects.",
    challenge: "Build a performance-optimized data visualization component",
    match: 94,
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignMasters",
    companyId: "DM",
    location: "New York, NY",
    salary: "95,000 - 120,000",
    type: "Full-time",
    culture: ["Creative freedom", "Design system focus", "Friday socials"],
    skills: ["Figma", "UI Design", "User Research"],
    description: "We're looking for a talented UX Designer to create beautiful and functional interfaces for our clients across various industries.",
    challenge: "Redesign our mobile app navigation for improved usability",
    match: 87,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataCraft Solutions",
    companyId: "DC",
    location: "Hybrid (San Francisco)",
    salary: "130,000 - 160,000",
    type: "Full-time",
    culture: ["Data-driven", "Mentorship program", "4-day work weeks"],
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Help us build cutting-edge machine learning models that power recommendations and insights for Fortune 500 companies.",
    challenge: "Develop a clustering algorithm for customer segmentation",
    match: 82,
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthHackers Co.",
    companyId: "GH",
    location: "Remote (US)",
    salary: "85,000 - 110,000",
    type: "Full-time",
    culture: ["Results-focused", "Team retreats", "Continuous learning"],
    skills: ["Growth Marketing", "Analytics", "Campaign Management"],
    description: "Drive our marketing strategy and lead campaigns that deliver measurable results for our B2B SaaS platform.",
    challenge: "Create a go-to-market strategy for our new product feature",
    match: 75,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudNative Systems",
    companyId: "CN",
    location: "Remote",
    salary: "120,000 - 150,000",
    type: "Full-time",
    culture: ["Async work", "Deep focus time", "Learning budget"],
    skills: ["Kubernetes", "AWS", "CI/CD"],
    description: "Help us build and maintain our cloud infrastructure, optimize deployment pipelines, and ensure system reliability.",
    challenge: "Design a microservice deployment strategy with high availability",
    match: 89,
  },
];


const Jobs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState([70000, 160000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const matchesQuery =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSalary =
        parseInt(job.salary.split(" - ")[0].replace(/\D/g, "")) <= salaryRange[1] &&
        parseInt(job.salary.split(" - ")[1].replace(/\D/g, "")) >= salaryRange[0];

      const matchesLocation =
        selectedLocation === "" || selectedLocation === "all" || job.location.includes(selectedLocation);

      const matchesRemote =
        !remoteOnly || job.location.toLowerCase().includes("remote");

      return matchesQuery && matchesSalary && matchesLocation && matchesRemote;
    });

    setFilteredJobs(filtered);
  };

  const handleApply = (jobId) => {
    navigate(`/apply`);
  };

  const handleTryChallenge = () => {
    navigate("/try-challenge");
  };

  const handleViewCompany = (companyId) => {
    navigate(`/company/${companyId}`);
  };

  const handleSliderChange = (e, index) => {
    const newRange = [...salaryRange];
    newRange[index] = parseInt(e.target.value);
    setSalaryRange(newRange);
  };

  return (
    <div className="min-h-screen flex flex-col">
      

      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Role</h1>
          <p className="text-lg text-gray-600 mb-8">Browse openings at companies that hire based on skills, not just resumes</p>

          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Find Jobs
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white border p-6 rounded-lg sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <Filter size={20} />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Salary Range</h3>
                  <input type="range" min="50000" max="200000" step="5000" value={salaryRange[0]} onChange={(e) => handleSliderChange(e, 0)} />
                  <input type="range" min="50000" max="200000" step="5000" value={salaryRange[1]} onChange={(e) => handleSliderChange(e, 1)} />
                  <div className="flex justify-between text-sm mt-2">
                    <span>${(salaryRange[0] / 1000).toFixed(0)}k</span>
                    <span>${(salaryRange[1] / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Location</h3>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="all">All locations</option>
                    <option value="Remote">Remote</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="New York">New York</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remote-only"
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                  />
                  <label htmlFor="remote-only" className="text-sm font-medium">
                    Remote only
                  </label>
                </div>

                <button onClick={handleSearch} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
              </h2>
              {/* Simple sort dropdown */}
              <select className="border border-gray-300 rounded px-3 py-2">
                <option value="match">Best Match</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <p
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => handleViewCompany(job.companyId)}
                        >
                          {job.company}
                        </p>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${job.match >= 90 ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}>
                        {job.match}% Match
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center"><MapPin size={16} className="mr-1" />{job.location}</div>
                      <div className="flex items-center"><Briefcase size={16} className="mr-1" />{job.type}</div>
                      <div className="flex items-center cursor-pointer hover:underline" onClick={() => handleViewCompany(job.companyId)}>
                        <Building2 size={16} className="mr-1" />{job.company}
                      </div>
                      <div className="flex items-center"><Clock size={16} className="mr-1" />Posted 5 days ago</div>
                    </div>

                    <p className="text-gray-700 mt-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-100 text-sm px-2 py-1 rounded">{skill}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-brand-800">
                      {job.culture.map((item, i) => (
                        <span key={i} className="bg-blue-50 px-2 py-0.5 rounded">{item}</span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="text-lg font-medium">${job.salary}</div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApply(job.id)}
                          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={handleTryChallenge}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Try Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Search size={48} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="mb-4">Try adjusting your filters or search query</p>
                  <button
                    className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={() => {
                      setSearchQuery("");
                      setSalaryRange([70000, 160000]);
                      setSelectedLocation("");
                      setRemoteOnly(false);
                      setFilteredJobs(jobs);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Jobs;
