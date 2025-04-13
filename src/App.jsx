import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Layout from "./component/Layout/Layout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import { Salary } from "./pages/Salary";
import { Feedback } from "./pages/Feedback";
import ScrollToTop from "./component/scrollTotop";
import ChallengeList from "./components/Challenges/ChallengeList";
import ChallengeDetail from "./components/Challenges/ChallengeDetail";
import Dashboard from "./components/Dashboard/Dashboard";
import ApplyJob from "./components/ApplyJob";
import TryChallenge from "./components/TryChallenge";
import JobsPages from "./pages/JobPages";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true, // whether animation should happen only once
    });

    // refresh AOS on every route change or re-render
    AOS.refresh();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobspages" element={<JobsPages />} />
          <Route path="apply" element={<ApplyJob />} />
          <Route path="salary" element={<Salary />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="assessments" element={<ChallengeList />} />
          <Route path="challenges/:id" element={<ChallengeDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="try-challenge" element={<TryChallenge />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
