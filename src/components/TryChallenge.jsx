import { useState } from "react";
import {
  CheckCircle,
  Clock,
  PenTool
} from "lucide-react";

const challengeQuestions = [
  {
    id: 1,
    type: "technical",
    question: "How would you optimize a React component that re-renders too frequently?",
    options: [
      "Use useCallback and useMemo hooks",
      "Implement shouldComponentUpdate",
      "Create more components to distribute state",
      "All of the Above"
    ],
    correctAnswer: 3
  },
  {
    id: 2,
    type: "technical",
    question: "What's the best approach to handle form state in React?",
    options: [
      "Use local useState for each input",
      "Create a reducer with useReducer",
      "Use a form library like react-hook-form",
      "It depends on the form complexity"
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    type: "behavioral",
    question: "How do you handle disagreements with team members on technical decisions?",
    options: [
      "Defer to the most senior team member",
      "Present data to support your position",
      "Suggest a compromise approach",
      "Set up a discussion with pros and cons for each option"
    ],
    correctAnswer: 3
  }
];

const codingTasks = [
  {
    id: 1,
    title: "Data Visualization Component",
    description: "Create a React component that visualizes data from an API response",
    difficulty: "Intermediate",
    timeEstimate: "2 hours"
  },
  {
    id: 2,
    title: "State Management",
    description: "Implement global state management for a shopping cart",
    difficulty: "Advanced",
    timeEstimate: "3 hours"
  }
];

const TryChallenge = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleStartChallenge = () => {
    setStarted(true);
    setActiveTab("questions");
  };

  const handleSelectAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < challengeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setActiveTab("coding");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitChallenge = () => {
    setCompleted(true);
    setActiveTab("results");
  };

  const totalSteps = challengeQuestions.length + 1;
  const currentStep = activeTab === "questions"
    ? currentQuestion + 1
    : activeTab === "coding"
    ? challengeQuestions.length + 1
    : totalSteps;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className=" bg-white dark:bg-gray-900 flex flex-col items-center justify-start pb-29">
      
      <div className="w-full  left-0 px-6 py-4 z-50 bg-white dark:bg-gray-900">
        <div className="w-full bg-gray-300 rounded-full h-3 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="pt-12 flex flex-col items-center justify-center">
    
        {activeTab === "info" && (
          <div className="flex flex-col justify-center items-center text-center py-20 px-6 space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">🎯 Ready to Push Your Limits?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              Experience a mock interview challenge and see how well you perform under pressure.
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
              onClick={handleStartChallenge}
            >
              Start Challenge
            </button>
          </div>
        )}


        {activeTab === "questions" && (
          <div className="flex flex-col justify-center items-center px-6 w-full">
            <div className="w-full max-w-2xl space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {challengeQuestions[currentQuestion].question}
              </h3>
              <ul className="space-y-3">
                {challengeQuestions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSelectAnswer(currentQuestion, index)}
                      className={`w-full text-left px-5 py-3 rounded-xl border transition duration-300 font-medium ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-blue-100 border-blue-600 text-blue-700'
                          : 'border-gray-300 text-gray-700 dark:text-gray-300'
                      } hover:bg-blue-50 dark:hover:bg-gray-800`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-6">
                <button
                  className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === challengeQuestions.length - 1
                    ? ' Proceed to Coding'
                    : 'Next '}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Coding Tab */}
        {activeTab === "coding" && (
          <div className="flex flex-col justify-center items-center px-6 w-full space-y-6">
            <div className="w-full max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">💻 Coding Tasks</h3>
              {codingTasks.map(task => (
                <div key={task.id} className="border border-gray-200 dark:border-gray-600 p-5 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{task.description}</p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    <Clock className="w-4 h-4 mr-2" /> {task.timeEstimate}
                    <span className="mx-3">•</span>
                    <PenTool className="w-4 h-4 mr-2" /> {task.difficulty}
                  </div>
                </div>
              ))}
              <button
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 shadow-md transition"
                onClick={handleSubmitChallenge}
              >
                Submit Challenge
              </button>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && completed && (
          <div className="flex flex-col justify-center items-center text-center space-y-4 px-6 py-20">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">🎉 Challenge Completed!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You’ve successfully completed the challenge. Great work!
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:shadow-lg"
              onClick={() => {
                setActiveTab("info");
                setCurrentQuestion(0);
                setSelectedAnswers([]);
                setStarted(false);
                setCompleted(false);
              }}
            >
              Restart Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryChallenge;
