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
}) {
  return (
    <section className="box-border px-5 py-10 m-0">
      <div className="box-border flex gap-5 p-8 mx-auto my-0 bg-white rounded-3xl border border-gray-200 border-solid max-w-[1200px] max-md:flex-col">
        <div className="box-border flex flex-1 items-center p-1 m-0 border border-solid border-neutral-300">
          <SearchInput placeholder="Search jobs, skills, or companies" />
        </div>

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
    </section>
  );
}

export default FilterBar;
