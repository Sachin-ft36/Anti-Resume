import React from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>

      <footer className="bg-white text-gray-600 px-10 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div className="space-y-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8fdbf6bba9645eb364cae948f56ada420c74fd9"
              alt="SkillMatch"
              className="h-[20px] w-[80px]"
            />
            <p className="text-gray-500">
              Reimagining careers through skill-based matching, not resumes.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {["Browse Jobs", "Take Assessment", "For Employers", "Pricing"].map((item) => (
                <li key={item} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
                <li key={item} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 SkillMatch. All rights reserved.</p>
          <div className="flex gap-5 mt-4 md:mt-0 text-gray-500 text-xl">
            <a href="#" className="hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
