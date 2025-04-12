import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProcessCard from "./ProcessCard";

function HowItWorksSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const steps = [
    {
      number: "01",
      title: "Complete Skills Assessment",
      description: "Demonstrate your abilities through practical challenges tailored to your field.",
      bullets: [
        "Practical, job-relevant tasks",
        "No time constraints or pressure",
        "Multiple attempts allowed",
        "Immediate feedback on performance",
      ],
    },
    {
      number: "02",
      title: "Get Matched to Opportunities",
      description: "Our AI matches your proven skills to relevant job openings without bias.",
      bullets: [
        "Skill-first, not resume-first",
        "Anonymous initial evaluation",
        "Real-time opportunity alerts",
        "Bias-free and fair process",
      ],
    },
    {
      number: "03",
      title: "Interview With Confidence",
      description: "Skip the redundant technical screens and focus on cultural fit and specifics.",
      bullets: [
        "Showcase portfolio & proof of work",
        "Match based on skills & values",
        "Streamlined interviews",
        "Higher success rate",
      ],
    },
  ];

  return (
    <section className="relative px-6 py-20 text-white overflow-hidden bg-[#10002B]">
     
     
      <div className="relative z-10">
        <h2
          className="text-4xl font-bold text-center mb-4 max-sm:text-3xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          How{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#F72585]">
            SkillMatch
          </span>{" "}
          Works
        </h2>

        <p
          className="text-lg text-center text-white/80 mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="1000"
        >
          Our three-step process focuses on your abilities rather than your credentials — creating better outcomes for both candidates and employers.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <ProcessCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              bullets={step.bullets}
              aosType="fade-up"
              aosDelay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
