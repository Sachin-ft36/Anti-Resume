import React from "react";
import {Link} from "react-router-dom"

function JobCard({ job }) {
  const { title, company, location, salary, jobType, skills, postedDays } = job;

  const getCompanyIcon = () => {
    if (company === "TechCorp") {
      return (
        <svg
          width="32"
          height="21"
          viewBox="0 0 32 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="company-icon"
        >
          <path
            d="M22.6667 9.625V2.625H9.33333V6.125H4V18.375H14.6667V14.875H17.3333V18.375H28V9.625H22.6667ZM9.33333 16.625H6.66667V14.875H9.33333V16.625ZM9.33333 13.125H6.66667V11.375H9.33333V13.125ZM9.33333 9.625H6.66667V7.875H9.33333V9.625ZM14.6667 13.125H12V11.375H14.6667V13.125ZM14.6667 9.625H12V7.875H14.6667V9.625ZM14.6667 6.125H12V4.375H14.6667V6.125ZM20 13.125H17.3333V11.375H20V13.125ZM20 9.625H17.3333V7.875H20V9.625ZM20 6.125H17.3333V4.375H20V6.125ZM25.3333 16.625H22.6667V14.875H25.3333V16.625ZM25.3333 13.125H22.6667V11.375H25.3333V13.125Z"
            fill="#5D788C"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="company-icon"
        >
          <path
            d="M18.6667 7V0H5.33333V3.5H0V15.75H10.6667V12.25H13.3333V15.75H24V7H18.6667ZM5.33333 14H2.66667V12.25H5.33333V14ZM5.33333 10.5H2.66667V8.75H5.33333V10.5ZM5.33333 7H2.66667V5.25H5.33333V7ZM10.6667 10.5H8V8.75H10.6667V10.5ZM10.6667 7H8V5.25H10.6667V7ZM10.6667 3.5H8V1.75H10.6667V3.5ZM16 10.5H13.3333V8.75H16V10.5ZM16 7H13.3333V5.25H16V7ZM16 3.5H13.3333V1.75H16V3.5ZM21.3333 14H18.6667V12.25H21.3333V14ZM21.3333 10.5H18.6667V8.75H21.3333V10.5Z"
            fill="#5D788C"
          />
        </svg>
      );
    }
  };

  return (
    <article
      className="transition-transform duration-300 hover:scale-[1.015] hover:shadow-lg shadow-md bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between"
      style={{
        boxShadow:
          "0 4px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <header className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            {getCompanyIcon()} {company}
          </p>
        </div>
        <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
          {jobType}
        </span>
      </header>

      <div className="flex flex-col gap-3 text-sm text-slate-600 mb-4">
        <div className="flex items-center gap-2">
          <LocationIcon />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <SalaryIcon />
          <span>{salary}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <footer className="flex justify-between items-center pt-4 border-t border-gray-200 text-sm text-gray-500">
        <span>Posted {postedDays} days ago</span>
       <Link to="/apply">
       <button className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-5 py-2 rounded-full font-semibold text-sm shadow-sm">
          View Job
        </button>
       </Link>

      </footer>
    </article>
  );
}

const LocationIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#5D788C"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11.5c1.38 0 2.5-1.12 2.5-2.5S13.38 6.5 12 6.5 9.5 7.62 9.5 9s1.12 2.5 2.5 2.5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z"
    />
  </svg>
);

const SalaryIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="black"
    strokeWidth={1.5}
  >
    <path d="M3 6h18M3 10h18M3 14h18M3 18h18" />
  </svg>
);

export default JobCard;
