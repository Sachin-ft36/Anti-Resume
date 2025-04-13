import React from "react";
import SearchInput from "./SearchInput";
import Dropdown from "./Dropdown";

function FilterBar({
  jobTypes,
  locations,
  skills,
  selectedJobType,
  selectedLocation,
  selectedSkills,
  onJobTypeSelect,
  onLocationSelect,
  onSkillSelect,
  onSearch,
}) {
  return (
<section className="px-5 py-10">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mx-auto bg-white rounded-3xl border border-gray-200 shadow-md max-w-[1200px] px-6 py-8">
    
    {/* Search Input */}
    <div className="w-full md:flex-1">
      <SearchInput
        placeholder="Search jobs, skills, or companies"
        onChange={onSearch}
      />
    </div>

    {/* Dropdowns */}
    <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
      <Dropdown
        label="Job Type"
        options={jobTypes}
        selectedOption={selectedJobType}
        onSelect={onJobTypeSelect}
      />

      <Dropdown
        label="Location"
        options={locations}
        selectedOption={selectedLocation}
        onSelect={onLocationSelect}
      />

      <Dropdown
        label="Skills"
        options={skills}
        selectedOption={selectedSkills}
        onSelect={onSkillSelect}
      />
    </div>

  </div>
</section>



  );
}

export default FilterBar;
