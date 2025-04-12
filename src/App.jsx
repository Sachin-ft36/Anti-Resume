import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
// import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ChallengeList from './components/Challenges/ChallengeList';
import ChallengeDetail from './components/Challenges/ChallengeDetail';

import './App.css';
import InterviewScheduler from './components/InterviewScheduler';
import Jobs from './pages/Jobs';
import TryChallenge from './components/TryChallenge';
import ApplyJob from './components/ApplyJob';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/* <Navbar /> */}
        
        
        <main className="container mx-auto py-4 px-2 min-h-screen">
          <Routes>
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/try-challenge" element={<TryChallenge />} />
             
             <Route path="/apply" element={ <ApplyJob/>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

<Route path="/jobs" element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } />

<Route path="/interviewscheduler" element={
              <ProtectedRoute>
                <InterviewScheduler/>
              </ProtectedRoute>
            } />



            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/challenges" element={
              <ProtectedRoute>
                <ChallengeList />
              </ProtectedRoute>
            } />
            <Route path="/challenges/:id" element={
              <ProtectedRoute>
                <ChallengeDetail />
              </ProtectedRoute>
            } />
            
          </Routes>
        </main>
      
      </div>
    </AuthProvider>
  );
}

export default App;