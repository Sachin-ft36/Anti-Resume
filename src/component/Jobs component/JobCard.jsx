import React from "react";

function JobCard({ job }) {
  const { title, company, location, salary, jobType, skills, postedDays } = job;

  // Company icon SVG based on company name
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
      className="box-border p-5 m-0 bg-white rounded border border-solid border-neutral-300"
      style={{
        boxShadow:
  "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",

      }}
    >
      <header className="box-border flex justify-between items-center p-0 m-0 mb-5 max-sm:flex-col max-sm:gap-2.5 max-sm:items-start">
        <h3 className="box-border p-0 m-0 text-xl font-bold">{title}</h3>
        <div className="box-border px-4 py-1.5 m-0 text-base bg-indigo-600 rounded text-neutral-100">
          {jobType}
        </div>
      </header>

      <div className="box-border flex gap-2.5 items-center p-0 m-0 mb-4 text-base text-slate-500">
        <div>{getCompanyIcon()}</div>
        <div className="box-border p-0 m-0">{company}</div>
      </div>

      <div className="box-border flex gap-2.5 items-center p-0 m-0 mb-4 text-base text-slate-500">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="location-icon"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z"
              fill="#5D788C"
            />
            <path
              d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z"
              fill="#5D788C"
            />
          </svg>
        </div>
        <div className="box-border p-0 m-0">{location}</div>
      </div>

      <div className="box-border flex gap-2.5 items-center p-0 m-0 mb-4 text-base text-slate-500">
        <div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="salary-icon"
          >
            <path
              d="M14.3438 3.375H3.65625C2.56894 3.375 1.6875 4.25644 1.6875 5.34375V12.6562C1.6875 13.7436 2.56894 14.625 3.65625 14.625H14.3438C15.4311 14.625 16.3125 13.7436 16.3125 12.6562V5.34375C16.3125 4.25644 15.4311 3.375 14.3438 3.375Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.6875 6.75H16.3125M4.5 10.5469H6.1875V11.25H4.5V10.5469Z"
              stroke="black"
              strokeWidth="1.875"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="box-border p-0 m-0">{salary}</div>
      </div>

      <div className="box-border flex gap-2.5 p-0 m-0 mb-5 max-sm:flex-wrap">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="box-border px-4 py-1.5 m-0 text-sm text-white bg-pink-600 rounded-[100px]"
          >
            {skill}
          </div>
        ))}
      </div>

      <footer className="box-border flex justify-between items-center p-0 pt-4 m-0 border-t border-solid border-t-stone-300 max-sm:flex-col max-sm:gap-2.5 max-sm:text-center">
        <div className="box-border p-0 m-0 text-sm text-black">
          Posted {postedDays} days ago
        </div>
        <button className="box-border px-6 py-3 m-0 text-base font-bold bg-indigo-600 rounded cursor-pointer border-[none] text-neutral-100 max-sm:w-full">
          View Job
        </button>
      </footer>
    </article>
  );
}

export default JobCard;
