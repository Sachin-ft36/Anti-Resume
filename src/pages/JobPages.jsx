import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";

const jobs = [
  {
    id: 6,
    title: "Full Stack Developer",
    company: "TechVenture LLC",
    companyId: "TV",
    location: "Remote",
    salary: "110,000 - 130,000",
    type: "Full-time",
    culture: ["Collaborative", "Continuous learning", "Tech-driven"],
    skills: ["JavaScript", "Node.js", "React", "MongoDB"],
    description: "Join our innovative team to develop and scale web applications using the latest technologies.",
    challenge: "Build a scalable API for handling real-time data",
    match: 88,
  },
  {
    id: 7,
    title: "Product Manager",
    company: "FutureTech",
    companyId: "FT",
    location: "Remote",
    salary: "120,000 - 150,000",
    type: "Full-time",
    culture: ["Autonomy", "Innovation", "Cross-functional teams"],
    skills: ["Product Strategy", "Agile", "Roadmap Planning"],
    description: "Lead the strategy, development, and delivery of innovative tech products.",
    challenge: "Define the roadmap for a new mobile app feature",
    match: 85,
  },
  {
    id: 8,
    title: "Software Engineer - Backend",
    company: "CodeCrafters Inc.",
    companyId: "CC",
    location: "New York",
    salary: "120,000 - 140,000",
    type: "Full-time",
    culture: ["High impact", "Tech-driven", "Inclusive"],
    skills: ["Go", "Docker", "Kubernetes", "Microservices"],
    description: "Build and maintain scalable backend systems for our growing product suite.",
    challenge: "Design a fault-tolerant microservice architecture",
    match: 90,
  },
  {
    id: 9,
    title: "Salesforce Administrator",
    company: "TechReach Solutions",
    companyId: "TRS",
    location: "San Francisco",
    salary: "95,000 - 115,000",
    type: "Full-time",
    culture: ["Fast-paced", "Customer-focused", "Dynamic environment"],
    skills: ["Salesforce", "CRM", "Automation", "Reporting"],
    description: "Administer and enhance our Salesforce instance to support our sales and marketing teams.",
    challenge: "Automate sales workflow for increased efficiency",
    match: 80,
  },
  {
    id: 10,
    title: "Mobile App Developer",
    company: "NextGen Solutions",
    companyId: "NGS",
    location: "San Francisco",
    salary: "70,000 - 160,000",
    type: "Full-time",
    culture: ["Innovation", "Creative freedom", "Inclusive"],
    skills: ["Flutter", "Dart", "Mobile UI Design"],
    description: "Join our team to develop cutting-edge mobile apps for a variety of industries.",
    challenge: "Develop a mobile app with seamless offline functionality",
    match: 86,
  },
  {
    id: 11,
    title: "Data Engineer",
    company: "CloudAnalytics",
    companyId: "CA",
    location: "Remote",
    salary: "130,000 - 160,000",
    type: "Full-time",
    culture: ["Data-driven", "Continuous learning", "Growth-focused"],
    skills: ["SQL", "Big Data", "ETL", "Python"],
    description: "Design and build data pipelines to power our analytics platform.",
    challenge: "Design an ETL pipeline for large-scale data processing",
    match: 92,
  },
  {
    id: 12,
    title: "SEO Specialist",
    company: "MarketingMasters",
    companyId: "MM",
    location: "Remote",
    salary: "75,000 - 95,000",
    type: "Full-time",
    culture: ["Results-driven", "Creative freedom", "Team-oriented"],
    skills: ["SEO", "Content Strategy", "Google Analytics", "Link Building"],
    description: "Manage and optimize SEO strategies to increase organic traffic for clients.",
    challenge: "Develop a comprehensive SEO strategy for a new website",
    match: 78,
  },
  {
    id: 13,
    title: "Cloud Architect",
    company: "CloudInnovators",
    companyId: "CI",
    location: "Hybrid",
    salary: "140,000 - 180,000",
    type: "Full-time",
    culture: ["Innovative", "Collaborative", "High impact"],
    skills: ["AWS", "Azure", "Cloud Architecture", "DevOps"],
    description: "Design and build scalable cloud infrastructure to support our global platform.",
    challenge: "Architect a multi-cloud solution for a global enterprise",
    match: 93,
  },
  {
    id: 14,
    title: "Quality Assurance Engineer",
    company: "TestMasters",
    companyId: "TM",
    location: "Hybrid",
    salary: "85,000 - 110,000",
    type: "Full-time",
    culture: ["Attention to detail", "Test-driven", "Collaborative"],
    skills: ["Manual Testing", "Automated Testing", "Selenium", "Jira"],
    description: "Ensure the quality of our products through rigorous testing and continuous improvement.",
    challenge: "Develop an automated testing suite for our web application",
    match: 81,
  },
  {
    id: 15,
    title: "System Administrator",
    company: "TechSolutions",
    companyId: "TS",
    location: "Remote",
    salary: "95,000 - 120,000",
    type: "Full-time",
    culture: ["Tech-focused", "Autonomous", "Supportive"],
    skills: ["Linux", "Networking", "AWS", "Monitoring"],
    description: "Maintain and optimize our infrastructure, ensuring high availability and security.",
    challenge: "Automate server provisioning and deployment processes",
    match: 84,
  }
];

const JobsPages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState([70000, 160000]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [sortOption, setSortOption] = useState("match");

  const handleSearch = () => {
    let filtered = jobs.filter((job) => {
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
        selectedLocation === "all" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesRemote =
        !remoteOnly || job.location.toLowerCase().includes("remote");

      return matchesQuery && matchesSalary && matchesLocation && matchesRemote;
    });

    filtered.sort((a, b) => {
      if (sortOption === "match") {
        return b.match - a.match;
      } else if (sortOption === "salary-high") {
        return (
          parseInt(b.salary.split(" - ")[1].replace(/\D/g, "")) -
          parseInt(a.salary.split(" - ")[1].replace(/\D/g, ""))
        );
      } else if (sortOption === "salary-low") {
        return (
          parseInt(a.salary.split(" - ")[0].replace(/\D/g, "")) -
          parseInt(b.salary.split(" - ")[0].replace(/\D/g, ""))
        );
      } else if (sortOption === "newest") {
        return new Date(b.postedDate) - new Date(a.postedDate);
      }
      return 0;
    });

    setFilteredJobs(filtered);
  };

  const handleApply = () => navigate(`/apply`);
  const handleTryChallenge = () => navigate("/try-challenge");
  const handleViewCompany = (companyId) => navigate(`/company/${companyId}`);
  const handleSliderChange = (e, index) => {
    const newRange = [...salaryRange];
    newRange[index] = parseInt(e.target.value);
    setSalaryRange(newRange);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-5 py-16 bg-gradient-to-br from-[#F9F4FF] via-[#FDF3FB] to-[#F5E8FF] text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-5 max-md:text-4xl">
            <span className="text-black">Find Your</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Perfect
            </span>{" "}
            <span>Role</span>
          </h1>

          <p className="text-2xl font-medium text-gray-700 mb-10 max-md:text-xl">
            Browse openings at companies that hire based on skills, not just resumes.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
            <div className="relative w-full sm:max-w-xl">
              <input
                type="text"
                placeholder="Search jobs, skills, or companies"
                className="w-full pl-12 pr-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
              onClick={handleSearch}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white border p-6 rounded-lg sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Filter size={20} />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Salary Range</h3>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>${(salaryRange[0] / 1000).toFixed(0)}k</span>
                    <span>${(salaryRange[1] / 1000).toFixed(0)}k</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="200000"
                    step="5000"
                    value={salaryRange[0]}
                    onChange={(e) => handleSliderChange(e, 0)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="50000"
                    max="200000"
                    step="5000"
                    value={salaryRange[1]}
                    onChange={(e) => handleSliderChange(e, 1)}
                    className="w-full mt-2"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Location</h3>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    value={selectedLocation}
                  >
                    <option value="all">All Locations</option>
                    <option value="Remote">Remote</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="New York">New York</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="remote-only"
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                  />
                  <label htmlFor="remote-only" className="text-sm">Remote Only</label>
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found</h2>
              <select
                className="border border-gray-300 rounded px-3 py-2"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  handleSearch();
                }}
              >
                <option value="match">Best Match</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
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
                    <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={handleTryChallenge}
                        className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                      >
                        Try Challenge
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No jobs found based on your filters.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPages;