import React from 'react';
import { Link, Route, Routes ,BrowserRouter as Router} from 'react-router-dom';
import { TransparentSalaryAndCulture } from '../Pages/TransparentSalaryAndCulture';
import { PostHireFeedbackLoop } from '../Pages/PostHireFeedbackLoop';

function Navbar() {
  return (
    
    <Router>
        <nav>
            <ul style={{ display: 'flex', gap: '1rem' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/salary">Salary and Culture</Link></li>
                <li><Link to="/feedback">Post-Hire Feedback</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path='/' element={<div>Home</div>}/>
            <Route path="/salary" element={<TransparentSalaryAndCulture />} />
            <Route path="/feedback" element={<PostHireFeedbackLoop />} />
        </Routes>
    </Router>
    
  );
}

export default Navbar;
