"use client";
import React from "react";

import HeroSection from "../component/HomeComponent/HeroSection";
import FeaturesSection from "../component/HomeComponent/FeatureSection";
import HowItWorksSection from "../component/HomeComponent/HowItWorkssection";
import FeaturedJobsSection from "../component/HomeComponent/Featuredjobsection";
import CallToActionSection from "../component/HomeComponent/Calltoaction";


const cssVariables = {
  "--bg-light": "#ffffff",
  "--text-gray": "#5D788C",
  "--primary-purple": "#5243D4",
  "--primary-pink": "#FF6B98",
  "--text-light": "#ffffff",
  "--text-dark": "#333333",
  "--border-color": "#E5E7EB",
};

function SkillMatchLanding() {
  return (
    <div style={cssVariables}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FeaturedJobsSection />
      <CallToActionSection />
  
    </div>
  );
}

export default SkillMatchLanding;
