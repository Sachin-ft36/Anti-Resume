import React, { useState, useEffect } from "react";
// import SignUpSuccessfull from "../components/SignupSuccess";

function SignUpModal({ toggleSignupModal, switchToLogin }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    course: "",
    batch: "",
  });

  const [errors, setErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const validateFirstName = (value) => /^[A-Za-z]+$/.test(value);
  const validateEmail = (value) => value.endsWith("@mujonline.edu.in");
  const validateOTP = (value) => /^\d{6}$/.test(value);
  const validatePassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);

  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else {
      clearInterval(timerInterval);
    }
  }, [otpTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (name === "firstName") {
      newErrors.firstName = validateFirstName(value)
        ? ""
        : "Only alphabets allowed.";
    }

    if (name === "email") {
      newErrors.email = validateEmail(value)
        ? ""
        : "Email must end with @mujonline.edu.in";
    }

    if (name === "otp") {
      newErrors.otp = validateOTP(value) ? "" : "OTP must be exactly 6 digits.";
    }

    if (name === "password") {
      newErrors.password = validatePassword(value)
        ? ""
        : "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value === formData.password ? "" : "Passwords do not match.";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validations = {
      firstName: validateFirstName(formData.firstName),
      email: validateEmail(formData.email),
      otp: validateOTP(formData.otp),
      password: validatePassword(formData.password),
      confirmPassword: formData.confirmPassword === formData.password,
    };

    const newErrors = {};

    Object.entries(validations).forEach(([key, valid]) => {
      if (!valid) {
        switch (key) {
          case "firstName":
            newErrors[key] = "Only alphabets allowed.";
            break;
          case "email":
            newErrors[key] = "Email must end with @mujonline.edu.in";
            break;
          case "otp":
            newErrors[key] = "OTP must be exactly 6 digits.";
            break;
          case "password":
            newErrors[key] =
              "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
            break;
          case "confirmPassword":
            newErrors[key] = "Passwords do not match.";
            break;
          default:
            break;
        }
      }
    });

    setErrors(newErrors);

    const allValid = Object.keys(newErrors).length === 0;

    if (allValid) {
      setShowSuccess(true);
    }
  };

  const goToLogin = () => {
    setShowSuccess(false);
    toggleSignupModal(false);
    switchToLogin();
  };

  const handleGetOtp = () => {
    if (otpTimer === 0) {
      setOtpTimer(90); // 1 minute 30 seconds = 90 seconds
      // You can add your API call to send OTP here
    }
  };

  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-full sm:w-96 p-6 rounded-lg shadow-lg">
        {showSuccess ? (
          <SignUpSuccessfull goToLogin={goToLogin} />
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP (Sent to Your Email)
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={otpTimer > 0}
                  className={`ml-2 px-4 py-2 text-white rounded-md ${
                    otpTimer > 0 ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600"
                  }`}
                >
                  {otpTimer > 0 ? formatTimer(otpTimer) : "Get OTP"}
                </button>
              </div>
              {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => toggleSignupModal(false)}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Already have an account? Log In
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUpModal;
