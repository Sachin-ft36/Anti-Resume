"use client";
import React, { useState } from "react";
import JobCard from "./JobCard";
import Dropdown from "./Dropdown";

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
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$90,000 - $120,000",
      jobType: "Full-time",
      skills: ["React", "TypeScript", "Tailwind Css"],
      postedDays: 2,
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      salary: "$90,000 - $120,000",
      jobType: "Full-time",
      skills: ["Figma", "User Research", "Prototyping"],
      postedDays: 3,
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "TechCorp",
      location: "Remote",
      salary: "$90,000 - $120,000",
      jobType: "Contract",
      skills: ["React", "TypeScript", "Tailwind Css"],
      postedDays: 2,
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "DesignHub",
      location: "New York, NY",
      salary: "$90,000 - $120,000",
      jobType: "Full-time",
      skills: ["Figma", "User Research", "Prototyping"],
      postedDays: 3,
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$90,000 - $120,000",
      jobType: "Full-time",
      skills: ["React", "TypeScript", "Tailwind Css"],
      postedDays: 2,
    },
    {
      id: 6,
      title: "UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      salary: "$90,000 - $120,000",
      jobType: "Full-time",
      skills: ["Figma", "User Research", "Prototyping"],
      postedDays: 3,
    },
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

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleSortChange = (order) => {
    onSortChange(order);
    setShowSortDropdown(false);
  };

  return (
    <section className="box-border px-5 py-0 mx-auto my-10 max-w-[1200px]">
      <div className="box-border flex justify-between items-center p-0 m-0 mb-8">
        <h2 className="box-border p-0 m-0 text-3xl font-semibold">
          {filteredJobs.length} jobs found
        </h2>
        <div
          className="box-border flex relative items-center px-5 py-2.5 m-0 border border-solid cursor-pointer border-zinc-300"
          onClick={toggleSortDropdown}
        >
          <div className="box-border p-0 m-0 mr-2.5 text-xl">
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </div>
          {showSortDropdown && (
            <div className="absolute right-0 top-full z-10 mt-1.5 bg-white rounded border border-solid border-zinc-300 min-w-[150px]">
              <div
                className="px-5 py-2.5 cursor-pointer hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSortChange("newest");
                }}
              >
                Newest First
              </div>
              <div
                className="px-5 py-2.5 cursor-pointer hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSortChange("oldest");
                }}
              >
                Oldest First
              </div>
            </div>
          )}
          <div>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="dropdown-icon"
            >
              <path
                d="M8.71875 11.625L15.5 18.4062L22.2812 11.625"
                stroke="black"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="box-border grid gap-8 p-0 m-0 grid-cols-[repeat(2,1fr)] max-md:grid-cols-[1fr]">
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

export default JobList;
