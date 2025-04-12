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
      <div className="flex flex-wrap gap-6 p-6 mx-auto bg-white rounded-3xl border border-gray-200 shadow-md max-w-[1200px] items-center justify-between max-md:flex-col max-md:gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <SearchInput
              placeholder="Search jobs, skills, or companies"
              onChange={onSearch}
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 justify-end max-md:w-full">
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
