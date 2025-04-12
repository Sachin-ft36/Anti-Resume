import React from "react";

function ProcessCard({ number, title, description, bullets, aosType, aosDelay }) {
  return (
    <div
      data-aos={aosType}
      data-aos-delay={aosDelay}
      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white hover:shadow-2xl transition-transform hover:-translate-y-2 border border-white/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full text-lg font-bold shadow-lg">
          {number}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-white/80 mb-4">{description}</p>
      <ul className="list-disc list-inside text-white/70 space-y-2">
        {bullets.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProcessCard;
