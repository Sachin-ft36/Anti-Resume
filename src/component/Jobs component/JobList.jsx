"use client";
import React, { useState } from "react";
import JobCard from "./JobCard";

function JobList({
  searchTerm,
  jobType,
  location,
  skill,
  sortOrder,
  onSortChange,
}) {
  // Mock job data - in a real app this would come from an API
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", salary: "$90,000 - $120,000", jobType: "Full-time", skills: ["React", "TypeScript", "Tailwind"], postedDays: 2 },
    { id: 2, title: "UX Designer", company: "DesignHub", location: "New York, NY", salary: "$90,000 - $120,000", jobType: "Contract", skills: ["Figma", "User Research", "Prototyping"], postedDays: 3 },
    { id: 3, title: "Data Analyst", company: "TechCorp", location: "Remote", salary: "$90,000 - $120,000", jobType: "Contract", skills: ["Python", "SQL", "Tableau"], postedDays: 5 },
    { id: 4, title: "Backend Engineer", company: "DesignHub", location: "New York, NY", salary: "$100,000 - $130,000", jobType: "Contract", skills: ["Node.js", "Express", "MongoDB"], postedDays: 1 },
    { id: 5, title: "Software Engineer", company: "InnovateTech", location: "San Francisco, CA", salary: "$110,000 - $150,000", jobType: "Full-time", skills: ["React", "TypeScript", "Tailwind"], postedDays: 7 },
    { id: 6, title: "Data Scientist", company: "DataWorks", location: "Remote", salary: "$95,000 - $125,000", jobType: "Full-time", skills: ["Python", "Machine Learning", "Pandas"], postedDays: 9 },
    { id: 7, title: "Product Manager", company: "Productify", location: "Chicago, IL", salary: "$120,000 - $160,000", jobType: "Full-time", skills: ["Agile", "Scrum", "Roadmap Planning"], postedDays: 6 },
    { id: 8, title: "Digital Marketing Specialist", company: "BrandBoost", location: "Remote", salary: "$70,000 - $90,000", jobType: "Contract", skills: ["SEO", "Google Analytics", "Content Strategy"], postedDays: 4 },
    { id: 9, title: "Web Developer", company: "WebSolutions", location: "Austin, TX", salary: "$80,000 - $100,000", jobType: "Full-time", skills: ["HTML", "CSS", "JavaScript"], postedDays: 10 },
    { id: 10, title: "Product Designer", company: "DesignMaster", location: "San Francisco, CA", salary: "$95,000 - $130,000", jobType: "Contract", skills: ["Sketch", "Figma", "User Testing"], postedDays: 8 },
    { id: 11, title: "DevOps Engineer", company: "CloudTech", location: "Los Angeles, CA", salary: "$120,000 - $140,000", jobType: "Full-time", skills: ["Node.js", "Express", "MongoDB"], postedDays: 5 },
    { id: 12, title: "Business Analyst", company: "ConsultX", location: "Remote", salary: "$80,000 - $110,000", jobType: "Full-time", skills: ["SQL", "Excel", "MongoDB"], postedDays: 6 },
    { id: 13, title: "Full Stack Developer", company: "NextGen", location: "Remote", salary: "$100,000 - $130,000", jobType: "Contract", skills: ["React", "Node.js", "MongoDB"], postedDays: 2 },
    { id: 14, title: "Customer Success Manager", company: "CloudWorks", location: "New York, NY", salary: "$85,000 - $115,000", jobType: "Full-time", skills: ["CRM", "Customer Support", "Node.js"], postedDays: 3 },
    { id: 15, title: "Machine Learning Engineer", company: "AI Solutions", location: "Remote", salary: "$110,000 - $150,000", jobType: "Contract", skills: ["Python", "TensorFlow", "Deep Learning"], postedDays: 4 },
    { id: 16, title: "Frontend Developer", company: "WebCraft", location: "Dallas, TX", salary: "$90,000 - $120,000", jobType: "Full-time", skills: ["React", "CSS", "JavaScript"], postedDays: 5 },
    { id: 17, title: "Backend Developer", company: "TechSolutions", location: "Austin, TX", salary: "$95,000 - $125,000", jobType: "Full-time", skills: ["Java", "Spring Boot", "AWS"], postedDays: 8 },
    { id: 18, title: "SEO Specialist", company: "SearchPro", location: "Remote", salary: "$60,000 - $80,000", jobType: "Contract", skills: ["Figma", "User Research", "Prototyping"], postedDays: 7 },
    { id: 19, title: "Security Engineer", company: "CyberTech", location: "Chicago, IL", salary: "$115,000 - $145,000", jobType: "Full-time", skills:  ["React", "TypeScript", "Tailwind"], postedDays: 6 },
    { id: 20, title: "Sales Engineer", company: "TechSolutions", location: "Remote", salary: "$90,000 - $120,000", jobType: "Full-time", skills: ["Salesforce", "User Research", "Client Relationships"], postedDays: 3 }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesJobType = !jobType || job.jobType === jobType;
    const matchesLocation = !location || job.location === location;
    const matchesSkill = !skill || job.skills.includes(skill);

    return matchesSearch && matchesJobType && matchesLocation && matchesSkill;
  });

  // Sort jobs based on sort order
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "newest") {
      return a.postedDays - b.postedDays;
    } else {
      return b.postedDays - a.postedDays;
    }
  });

  // Pagination logic
  const jobsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="box-border px-5 py-0 mx-auto my-10 max-w-[1200px]">
      <div className="box-border flex justify-between items-center p-0 m-0 mb-8">
        <h2 className="box-border p-0 m-0 text-3xl font-semibold">
          {sortedJobs.length} jobs found
        </h2>
      </div>

      {/* Job Cards */}
      <div className="box-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="box-border flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default JobList;
