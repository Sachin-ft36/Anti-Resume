import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, Check, ArrowRight, Users, Share2, Link } from "lucide-react";
import { toast } from "sonner";

// Sample available time slots
const timeSlots = [
  { id: 1, day: new Date(2025, 3, 15), times: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { id: 2, day: new Date(2025, 3, 16), times: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { id: 3, day: new Date(2025, 3, 17), times: ["9:00 AM", "11:30 AM", "4:00 PM"] },
  { id: 4, day: new Date(2025, 3, 18), times: ["10:30 AM", "2:30 PM"] },
  { id: 5, day: new Date(2025, 3, 19), times: ["9:30 AM", "1:00 PM", "3:30 PM"] },
];

// Sample interviewer data
const interviewers = [
  { id: 1, name: "Albin", role: "Senior Frontend Developer", avatar: "AJ" },
  { id: 2, name: "Rahul Kumar", role: "Engineering Manager", avatar: "SC" },
  { id: 3, name: "Abhishesh Kumar ", role: "Technical Lead", avatar: "MP" }
];

// Sample candidate data
const candidates = [
  { id: 1, name: "Sandeep", email: "sandeep@gmail.com", role: "Frontend Developer", status: "Scheduled" },
  { id: 2, name: "Sachin Pratap Singh", email: "SachinSingh@gmail.com", role: "Backend Developer", status: "Pending" },
  { id: 3, name: "Tharun Unnikrishnan", email: "TharunUnnikrishnan@gmail.com", role: "UX Designer", status: "Scheduled" },
];

const InterviewScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState("date");
  const [scheduled, setScheduled] = useState(false);
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const navigate = useNavigate();
  
  // Filter available times for selected date
  const availableTimes = selectedDate 
    ? timeSlots.find(slot => 
        slot.day.getDate() === selectedDate.getDate() && 
        slot.day.getMonth() === selectedDate.getMonth() && 
        slot.day.getFullYear() === selectedDate.getFullYear()
      )?.times || [] 
    : [];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  
  const handleInterviewerSelect = (id) => {
    setSelectedInterviewer(id);
  };

  const handleCandidateSelect = (id) => {
    setSelectedCandidate(id);
  };
  
  const handleNext = () => {
    if (activeTab === "date" && selectedDate && selectedTime) {
      setActiveTab("candidate");
    } else if (activeTab === "candidate" && selectedCandidate !== null) {
      setActiveTab("interviewer");
    } else if (activeTab === "interviewer" && selectedInterviewer !== null) {
      setActiveTab("confirm");
    }
  };
  
  const handleBack = () => {
    if (activeTab === "candidate") {
      setActiveTab("date");
    } else if (activeTab === "interviewer") {
      setActiveTab("candidate");
    } else if (activeTab === "confirm") {
      setActiveTab("interviewer");
    }
  };
  
  const handleSchedule = () => {
    setScheduled(true);
    toast.success("Interview successfully scheduled!");
  };

  const handleStartInterview = () => {
    // navigate("/live-interview");
    
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://skillsphere.com/interview/xyz123");
    toast.success("Meeting link copied to clipboard!");
  };
  
  const interviewer = selectedInterviewer !== null 
    ? interviewers.find(i => i.id === selectedInterviewer) 
    : null;

  const candidate = selectedCandidate !== null
    ? candidates.find(c => c.id === selectedCandidate)
    : null;

  // Simple calendar component
  const SimpleCalendar = ({ selected, onSelect, disabled }) => {
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
    
    const today = new Date();
    const currentMonth = selected ? selected.getMonth() : today.getMonth();
    const currentYear = selected ? selected.getFullYear() : today.getFullYear();
    
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isDisabled = disabled(date);
      const isSelected = selected && selected.getDate() === i && selected.getMonth() === currentMonth && selected.getFullYear() === currentYear;
      
      days.push(
        <button
          key={`day-${i}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${isSelected ? 'bg-blue-500 text-white' : ''}
            ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
          `}
          onClick={() => !isDisabled && onSelect(date)}
          disabled={isDisabled}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="w-56">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => onSelect(new Date(currentYear, currentMonth - 1, 1))}>&lt;</button>
          <div>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
          <button onClick={() => onSelect(new Date(currentYear, currentMonth + 1, 1))}>&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-xs text-center font-medium text-gray-500">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto shadow-md rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Schedule Your Interview</h2>
      </div>
      
      {scheduled ? (
        <div className="p-6">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interview Scheduled!</h3>
            <p className="text-gray-600 mb-6">
              Your interview with {candidate?.name} has been confirmed for {selectedDate?.toDateString()} at {selectedTime} with {interviewer?.name}.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
              <h4 className="font-medium mb-2">Next Steps:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mt-1 mr-2" />
                  <span>You'll receive a confirmation email with calendar invite</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mt-1 mr-2" />
                  <span>Prepare any questions you have about the role</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mt-1 mr-2" />
                  <span>Review the job description and candidate's challenge submission</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button 
                className="flex-1 flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleStartInterview}
              >
                Join Interview Now
              </button>
              
              <button 
                className="flex-1 flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
                onClick={() => setShowMeetingLink(true)}
              >
                <Link className="h-4 w-4 mr-2" />
                Share Meeting Link
              </button>
            </div>
          </div>
          
          {showMeetingLink && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-bold mb-2">Interview Meeting Link</h3>
                <p className="text-gray-600 mb-4">
                  Share this link with the candidate or other interviewers
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="border rounded-md px-3 py-2 flex-1 bg-gray-50 overflow-x-auto">
                    <code className="text-sm">https://skillsphere.com/interview/xyz123</code>
                  </div>
                  <button 
                    className="bg-blue-500 text-white py-1 px-3 rounded text-sm flex items-center hover:bg-blue-600"
                    onClick={handleCopyLink}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy
                  </button>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowMeetingLink(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === "date" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("date")}
              >
                Date & Time
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === "candidate" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} ${!selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !(!selectedDate || !selectedTime) && setActiveTab("candidate")}
                disabled={!selectedDate || !selectedTime}
              >
                Select Candidate
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === "interviewer" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} ${selectedCandidate === null ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => selectedCandidate !== null && setActiveTab("interviewer")}
                disabled={selectedCandidate === null}
              >
                Choose Interviewer
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === "confirm" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} ${selectedInterviewer === null ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => selectedInterviewer !== null && setActiveTab("confirm")}
                disabled={selectedInterviewer === null}
              >
                Confirm Details
              </button>
            </div>
          </div>
          
          {activeTab === "date" && (
            <div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Select a Date
                    </h3>
                    <SimpleCalendar
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        return !timeSlots.some(slot => 
                          slot.day.getDate() === date.getDate() && 
                          slot.day.getMonth() === date.getMonth() && 
                          slot.day.getFullYear() === date.getFullYear()
                        );
                      }}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Select a Time
                    </h3>
                    
                    {selectedDate ? (
                      <div className="space-y-2">
                        {availableTimes.length > 0 ? (
                          availableTimes.map((time) => (
                            <div 
                              key={time}
                              className={`border rounded-md p-3 cursor-pointer transition-colors ${
                                selectedTime === time 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${
                                  selectedTime === time 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300'
                                }`}>
                                  {selectedTime === time && (
                                    <Check className="h-2 w-2 text-white" />
                                  )}
                                </div>
                                <span>{time}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">
                            No available time slots for this date. Please select another date.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 border rounded-md bg-gray-50">
                        <p className="text-gray-500">Please select a date first</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {activeTab === "candidate" && (
            <div>
              <div className="p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Select a Candidate
                </h3>
                
                <div className="grid gap-4">
                  {candidates.map((candidate) => (
                    <div 
                      key={candidate.id}
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        selectedCandidate === candidate.id
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleCandidateSelect(candidate.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-4">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.role}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className={`px-2 py-1 rounded-full ${
                            candidate.status === 'Scheduled' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {candidate.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button 
                  className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  onClick={handleNext}
                  disabled={selectedCandidate === null}
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {activeTab === "interviewer" && (
            <div>
              <div className="p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Select an Interviewer
                </h3>
                
                <div className="grid gap-4">
                  {interviewers.map((interviewer) => (
                    <div 
                      key={interviewer.id}
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        selectedInterviewer === interviewer.id
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInterviewerSelect(interviewer.id)}
                    >
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-4">
                          {interviewer.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{interviewer.name}</p>
                          <p className="text-sm text-gray-500">{interviewer.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button 
                  className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  onClick={handleNext}
                  disabled={selectedInterviewer === null}
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {activeTab === "confirm" && (
            <div>
              <div className="p-6">
                <h3 className="font-medium mb-4">Confirm Interview Details</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Candidate</span>
                    <span className="font-medium">{candidate?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role</span>
                    <span className="font-medium">{candidate?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{selectedDate?.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interviewer</span>
                    <span className="font-medium">{interviewer?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format</span>
                    <span className="font-medium">Video Call (Live Interview)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">45 minutes</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Preparing for the interview:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Review the candidate's profile and challenge submission</li>
                    <li>Prepare your technical and behavioral questions</li>
                    <li>Test your camera and microphone before the call</li>
                    <li>Ensure you have a stable internet connection</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button 
                  className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleSchedule}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InterviewScheduler;