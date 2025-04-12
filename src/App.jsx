import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
