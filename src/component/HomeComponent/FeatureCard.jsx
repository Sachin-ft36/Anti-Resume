import React from "react";

function FeatureCard({ icon, title, description, aosType, aosDelay }) {
  return (
    <div
      data-aos={aosType}
      data-aos-delay={aosDelay}
      className="bg-white text-gray-800 rounded-2xl p-6 shadow-xl transform transition-all hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
