import { useState } from "react";
import { Search, BadgeCheck, MapPin, Users, Star } from "lucide-react";

const companies = [
    {
      id: 1,
      name: "TechInnovate Inc.",
      logo: "TI",
      color: "bg-blue-100 text-blue-800",
      industry: "Software Development",
      diversityScore: 92,
      location: "Remote (Global)",
      employees: "250-500",
      minSalary: 95000,
      maxSalary: 180000,
      openPositions: 8,
      description: "A forward-thinking software company specializing in AI and machine learning solutions.",
      workLife: 4.8,
      culture: ["Remote-first", "Flexible hours", "Learning stipend", "4-day workweek pilot"],
      featured: true
    },
    {
      id: 2,
      name: "DesignMasters",
      logo: "DM",
      color: "bg-purple-100 text-purple-800",
      industry: "Creative Design",
      diversityScore: 88,
      location: "New York, NY (Hybrid)",
      employees: "50-100",
      minSalary: 80000,
      maxSalary: 150000,
      openPositions: 5,
      description: "Award-winning design studio focused on creating memorable digital experiences.",
      workLife: 4.5,
      culture: ["Hybrid work", "Creative freedom", "Friday socials", "Mentorship program"],
      featured: true
    },
    {
      id: 3,
      name: "DataCraft Solutions",
      logo: "DC",
      color: "bg-green-100 text-green-800",
      industry: "Data Analytics",
      diversityScore: 85,
      location: "Chicago, IL & Remote",
      employees: "100-250",
      minSalary: 90000,
      maxSalary: 170000,
      openPositions: 7,
      description: "Helping businesses leverage data to make smarter decisions and drive growth.",
      workLife: 4.2,
      culture: ["Data-driven", "Mentorship program", "4-day work weeks", "Continuous learning"],
      featured: true
    },
    {
      id: 4,
      name: "GrowthHackers Co.",
      logo: "GH",
      color: "bg-orange-100 text-orange-800",
      industry: "Marketing",
      diversityScore: 90,
      location: "Austin, TX (Flexible)",
      employees: "25-50",
      minSalary: 75000,
      maxSalary: 140000,
      openPositions: 4,
      description: "Digital marketing experts specializing in sustainable growth strategies.",
      workLife: 4.4,
      culture: ["Results-focused", "Team retreats", "Continuous learning"],
      featured: true
    },
    {
      id: 5,
      name: "FinTech Forward",
      logo: "FF",
      color: "bg-teal-100 text-teal-800",
      industry: "Financial Services",
      diversityScore: 82,
      location: "San Francisco, CA",
      employees: "100-250",
      minSalary: 100000,
      maxSalary: 200000,
      openPositions: 6,
      description: "Revolutionizing financial services through innovative technology solutions.",
      workLife: 3.9,
      culture: ["Hybrid model", "Professional development", "Wellness program"],
      featured: false
    },
    {
      id: 6,
      name: "HealthTech Innovations",
      logo: "HT",
      color: "bg-red-100 text-red-800",
      industry: "Healthcare",
      diversityScore: 87,
      location: "Boston, MA & Remote",
      employees: "50-100",
      minSalary: 90000,
      maxSalary: 180000,
      openPositions: 3,
      description: "Creating technology to improve patient outcomes and healthcare accessibility.",
      workLife: 4.3,
      culture: ["Mission-driven", "Flexible schedule", "Healthcare benefits"],
      featured: false
    },
    {
      id: 7,
      name: "EcoSystems Engineering",
      logo: "ES",
      color: "bg-emerald-100 text-emerald-800",
      industry: "Environmental Tech",
      diversityScore: 91,
      location: "Portland, OR (Hybrid)",
      employees: "25-50",
      minSalary: 85000,
      maxSalary: 160000,
      openPositions: 4,
      description: "Developing sustainable technology solutions for environmental challenges.",
      workLife: 4.7,
      culture: ["Sustainability focus", "Volunteer days", "B-Corp certified", "Bike to work incentives"],
      featured: false
    },
    {
      id: 8,
      name: "RetailRevolution",
      logo: "RR",
      color: "bg-indigo-100 text-indigo-800",
      industry: "E-commerce",
      diversityScore: 84,
      location: "Seattle, WA & Remote",
      employees: "100-250",
      minSalary: 80000,
      maxSalary: 150000,
      openPositions: 5,
      description: "Transforming online shopping experiences through innovative retail technology.",
      workLife: 4.0,
      culture: ["Fast-paced", "Stock options", "Product discounts", "Innovation time"],
      featured: false
    },
  ];
  
const  Companies=()=> {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch =
      !searchTerm ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !industryFilter || company.industry === industryFilter;
    const matchesLocation = !locationFilter || company.location.includes(locationFilter);
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  const uniqueIndustries = [...new Set(companies.map(company => company.industry))];
  const uniqueLocations = [...new Set(companies.map(company => company.location))];

  return (
    <div className="min-h-screen bg-white">
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">Discover Skill-First Companies</h1>
        <p className="text-gray-600 mb-6">Explore organizations committed to fair hiring and diverse cultures.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <input
            type="text"
            placeholder="Search companies..."
            className="border rounded px-4 py-2 w-full max-w-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            value={industryFilter}
            onChange={e => setIndustryFilter(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">All Industries</option>
            {uniqueIndustries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-4 max-w-6xl mx-auto">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-2">No matching companies found</h2>
            <button
              onClick={() => {
                setSearchTerm("");
                setIndustryFilter("");
                setLocationFilter("");
              }}
              className="mt-4 px-4 py-2 border rounded hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {filteredCompanies.map(company => (
              <div key={company.id} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full mr-4 ${company.color}`}>
                    <span className="font-bold text-lg">{company.logo}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      {company.name}
                      {company.featured && <BadgeCheck className="ml-2 h-4 w-4 text-blue-600" />}
                    </h3>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{company.description}</p>

                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {company.culture.slice(0, 3).map((item, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-gray-800">{item}</span>
                  ))}
                  {company.culture.length > 3 && (
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-800">+{company.culture.length - 3}</span>
                  )}
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{company.location}</div>
                  <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{company.employees} employees</div>
                  <div className="flex items-center">💰 ${company.minSalary.toLocaleString()} - ${company.maxSalary.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-gray-700">
                  <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" />{company.workLife} Work/Life</div>
                  <div>Diversity: {company.diversityScore}%</div>
                </div>

                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Companies