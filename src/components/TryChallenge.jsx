import { useState } from "react";
import { CheckCircle, Clock, Code, PenTool, Briefcase, Check, ArrowRight, FileText } from "lucide-react";

const challengeQuestions = [
  {
    id: 1,
    type: "technical",
    question: "How would you optimize a React component that re-renders too frequently?",
    options: [
      "Use useCallback and useMemo hooks",
      "Implement shouldComponentUpdate",
      "Create more components to distribute state",
      "All of the above"
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {activeTab === "info" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Try a Mock Challenge</h2>
          <p className="mb-6 text-gray-600">Test your skills in a real interview-like environment.</p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleStartChallenge}
          >
            Start Challenge
          </button>
        </div>
      )}

      {activeTab === "questions" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{challengeQuestions[currentQuestion].question}</h3>
            <ul className="space-y-2">
              {challengeQuestions[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelectAnswer(currentQuestion, index)}
                    className={`w-full text-left px-4 py-2 rounded border ${selectedAnswers[currentQuestion] === index ? 'bg-blue-100 border-blue-600' : 'border-gray-300'} hover:bg-blue-50`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleNextQuestion}
            >
              {currentQuestion === challengeQuestions.length - 1 ? 'Proceed to Coding Task' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {activeTab === "coding" && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Coding Tasks</h3>
          {codingTasks.map(task => (
            <div key={task.id} className="border p-4 rounded-md shadow">
              <h4 className="text-lg font-semibold">{task.title}</h4>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4 mr-1" /> {task.timeEstimate}
                <span className="mx-2">•</span>
                <PenTool className="w-4 h-4 mr-1" /> {task.difficulty}
              </div>
            </div>
          ))}
          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleSubmitChallenge}
          >
            Submit Challenge
          </button>
        </div>
      )}

      {activeTab === "results" && completed && (
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Challenge Completed!</h3>
          <p className="text-gray-600 mb-4">You’ve successfully completed the challenge. Great work!</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setActiveTab("info")}
          >
            Restart Challenge
          </button>
        </div>
      )}
    </div>
  );
};

export default TryChallenge;
