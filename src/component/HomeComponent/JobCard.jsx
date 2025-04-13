import React from "react";
import { Link } from "react-router-dom";

function JobCard({
  title,
  type,
  company,
  location,
  salary,
  skills = [], 
  postedTime,
  featured,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full border border-gray-200">
   
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {featured && (
            <span className="px-3 py-1 text-xs font-semibold text-pink-600 bg-pink-100 rounded-full">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium text-gray-700">{company}</span> • {location}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {type} • {salary}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400 italic">No skills listed</span>
          )}
        </div>
      </div>

  
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">{postedTime}</span>
        <div className="flex gap-2">
        <Link to="/apply">
          <button className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition">
            Apply Now
          </button>
          </Link>
          <button className="px-4 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
