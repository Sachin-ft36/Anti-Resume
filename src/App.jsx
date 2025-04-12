import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import { Salary } from './pages/Salary';
import { Feedback } from './pages/Feedback';
import ScrollToTop from './component/scrollTotop'; // <-- import here

const App = () => (
  <Router>
    <ScrollToTop /> {/* Ensure scrolls to top on every route change */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/feedback" element={<Feedback />} />
        
      </Route>
    </Routes>
  </Router>
);

export default App;
