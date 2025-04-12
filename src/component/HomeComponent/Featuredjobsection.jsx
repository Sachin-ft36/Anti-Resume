import React from "react";
import JobCard from "./JobCard";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "$70k - $90k",
    description: "Build beautiful UIs using React.",
  },
  {
    title: "Backend Engineer",
    company: "DataStream",
    location: "San Francisco, CA",
    salary: "$100k - $120k",
    description: "Design scalable APIs and work with databases.",
  },
  {
    title: "UX Designer",
    company: "CreativeMind",
    location: "New York, NY",
    salary: "$80k - $100k",
    description: "Design intuitive user experiences.",
  },
];

function FeaturedJobsSection() {
  return (
    <section className="relative px-6 py-20  bg-gradient-to-br from-[#F9F4FF]  via-[#FDF3FB] to-[#F5E8FF] overflow-hidden z-0 text-black">
     

      {/* Animated Content */}
      <h2
        className="relative z-10 text-4xl font-extrabold text-center mb-6 max-sm:text-3xl"
        data-aos="fade-up"
      >
        Explore Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Featured Jobs
        </span>
      </h2>

      <p
        className="relative z-10 text-lg text-center text-black-300 mb-14 max-w-xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Find opportunities that match your passion and skills. Discover roles
        from top companies around the world.
      </p>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
        {jobs.map((job, index) => (
          <div
            key={index}
          
            data-aos="zoom-in-up"
            data-aos-delay={index * 200}
          >
            <JobCard {...job} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedJobsSection;
