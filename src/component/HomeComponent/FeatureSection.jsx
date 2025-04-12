import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FeatureCard from "./FeatureCard";

import {
  FaLightbulb,
  FaBullseye,
  FaChartBar,
  FaUsers,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function FeaturesSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      icon: <FaLightbulb />,
      title: "Skill-Based Assessment",
      description: "Show what you can do through practical challenges tailored to your field.",
    },
    {
      icon: <FaBullseye />,
      title: "Blind Matching",
      description: "Reduce bias with skill-first candidate evaluation.",
    },
    {
      icon: <FaChartBar />,
      title: "Salary Transparency",
      description: "Clear salary ranges for all positions so you know what to expect.",
    },
    {
      icon: <FaUsers />,
      title: "Culture Fit Metrics",
      description: "Understand company culture through data-driven insights from current employees.",
    },
    {
      icon: <FaChartLine />,
      title: "Continuous Improvement",
      description: "Get live feedback and use it as opportunities for better matches over time.",
    },
    {
      icon: <FaRobot />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms connect your proven skills to the right opportunities.",
    },
  ];

  return (
    <section className="box-border px-6 py-20 m-0  bg-gradient-to-br from-[#FDF3FB] via-[#F5E8FF]  to-[#F9F4FF]  text-black overflow-hidden relative">
      <div data-aos="fade-down">
        <h2 className="mb-6 text-4xl font-bold text-center max-sm:text-3xl">
          <span>Reimagine </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hiring</span>{" "}
          <span>Through </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Skills</span>
        </h2>
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <p className="mb-12 text-lg text-center text-black/80 max-w-2xl mx-auto">
          Our platform focuses on what truly matters — your abilities and potential, not just credentials on a resume.
        </p>
      </div>

      <div className="grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            aosType="fade-up"
            aosDelay={index * 100}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
