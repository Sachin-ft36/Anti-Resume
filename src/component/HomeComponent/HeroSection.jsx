import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden box-border flex  px-10 py-24  max-md:flex-col max-md:px-5 max-md:py-12 bg-[#10002B]"
    >
      <div
        className="relative z-10 max-w-[600px] max-md:max-w-full max-md:mb-10"
        data-aos="fade-right"
      >
        <h1 className="mb-8 text-6xl font-extrabold leading-tight tracking-tight max-sm:text-4xl max-md:text-5xl text-white drop-shadow-md">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Skills
          </span>{" "}
          First,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Resumes
          </span>{" "}
          Second
        </h1>

        <p className="mb-10 text-xl text-gray-300 opacity-90 leading-relaxed">
          SkillMatch revolutionizes hiring by focusing on what truly matters:
          your skills and abilities, not just your resume credentials.
        </p>

        <div className="flex gap-4" data-aos="fade-up" data-aos-delay="150">
          <Link to="/assessments">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:brightness-110 transition-all duration-300">
            Take Assessment
          </button>
          </Link>
         <Link to="/jobspages">
         <button className="px-6 py-3 border-2 border-pink-400 text-pink-500 font-semibold bg-white rounded-full hover:bg-pink-50 transition-all duration-300">
            Browse Jobs
          </button>
         </Link>

        </div>
        <div className="mb-10" data-aos="fade-up" data-aos-delay="200">
          <p className="mt-4 mb-6 text-base text-gray-300">
            Join thousands of professionals who found their dream job
          </p>
          <div className="flex gap-4 flex-wrap mb-4">
            <ProfileCircle src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" />
            <ProfileCircle src="https://th.bing.com/th/id/OIP.SCfH4WgCcX8gsV3l52icJwHaFj?w=768&h=576&rs=1&pid=ImgDetMain" />
            <ProfileCircle src="https://i0.wp.com/siliconvalleyjournals.com/wp-content/uploads/2023/02/meta_PNG12.png?fit=4000%2C4000&ssl=1" />
            <ProfileCircle src="https://th.bing.com/th/id/R.0ac491574e7ddb71dc2cab65a8bb501f?rik=5NzURUJ1L37UYg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png&ehk=kQ%2bTI4imrP%2fg9UWIfehFMJOqAn1A3RQTROHV%2f1ORknk%3d&risl=&pid=ImgRaw&r=0" />
          </div>
          <p className="text-sm text-zinc-500 font-medium">✅ 97% success rate</p>
        </div>
      </div>
      <div
        className="relative z-10 ml-12 max-md:ml-0 max-md:mb-8"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F9537c6fa1b6f47ca88fb9108030c717a%2Fc60aa8b36b414acc92a8353479c759b0"
          className="w-full h-auto max-w-[550px] rounded-2xl shadow-2xl"
          alt="Platform preview"
        />
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
        <p className="text-base text-gray-300 font-semibold">
          🚀 Trusted by leading companies
        </p>
      </div>
    </section>
  );
}

// Company logo bubble
function ProfileCircle({ src }) {
  return (
    <img
      src={src}
      alt="Company logo"
      className="rounded-full h-[40px] w-[40px] object-contain border border-white shadow-md bg-white p-1"
    />
  );
}

export default HeroSection;
