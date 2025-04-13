import React, { useState } from "react";
import HeroSection from "../component/Jobs component/fingjob";
import FilterBar from "../component/Jobs component/FilterBar";
import JobList from "../component/Jobs component/JobList";

function JobSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const jobTypes = ["Full-time", "Contract", "Part-time"];
  const locations = ["Remote", "New York, NY", "San Francisco, CA", "Los Angeles, CA", "Chicago, IL", "Austin, TX"];
  const skills = ["React", "TypeScript", "Figma", "User Research", "Python", "Node.js", "Express", "MongoDB", "Java"];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleJobTypeSelect = (type) => {
    setSelectedJobType(type);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkills(skill);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <main>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <HeroSection onSearch={handleSearch} />
      <FilterBar
        jobTypes={jobTypes}
        locations={locations}
        skills={skills}
        selectedJobType={selectedJobType}
        selectedLocation={selectedLocation}
        selectedSkills={selectedSkills}
        onJobTypeSelect={handleJobTypeSelect}
        onLocationSelect={handleLocationSelect}
        onSkillSelect={handleSkillSelect}
      />
      <JobList
        searchTerm={searchTerm}
        jobType={selectedJobType}
        location={selectedLocation}
        skill={selectedSkills}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
    </main>
  );
}

export default JobSearch;