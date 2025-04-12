

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { profileService } from '../../services/api';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    preferredRoles: '',
    workStyle: '',
  });
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
        setFormData({
          name: data.name || '',
          bio: data.bio || 'Frontend developer passionate about user experience and clean code.',
          location: data.location || 'alwar  Rajasthan',
          preferredRoles: data.preferredRoles || 'Frontend Developer, UI Engineer',
          workStyle: data.workStyle || 'Remote, Flexible hours',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await profileService.updateProfile(formData);
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-2">Manage your information and preferences</p>
      </header>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
          
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Preferred Roles
                  </label>
                  <input
                    type="text"
                    name="preferredRoles"
                    value={formData.preferredRoles}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-
onChange={handleChange}
className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 
/>
</div>
</div>

<div className="mb-6">
<label className="block text-gray-700 text-sm font-medium mb-2">
Preferred Work Style
</label>
<input
type="text"
name="workStyle"
value={formData.workStyle}
onChange={handleChange}
className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
/>
</div>

<div className="flex justify-end">
<button
type="submit"
disabled={loading}
className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
{loading ? 'Saving...' : 'Save Changes'}
</button>
</div>
</form>
) : (
<div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
<div>
<p className="text-sm text-gray-500">Full Name</p>
<p className="font-medium">{formData.name}</p>
</div>

<div>
<p className="text-sm text-gray-500">Email</p>
<p className="font-medium">{currentUser.email}</p>
</div>
</div>

<div className="mb-6">
<p className="text-sm text-gray-500">Bio</p>
<p>{formData.bio}</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
<div>
<p className="text-sm text-gray-500">Location</p>
<p className="font-medium">{formData.location}</p>
</div>

<div>
<p className="text-sm text-gray-500">Preferred Roles</p>
<p className="font-medium">{formData.preferredRoles}</p>
</div>
</div>

<div>
<p className="text-sm text-gray-500">Preferred Work Style</p>
<p className="font-medium">{formData.workStyle}</p>
</div>
</div>
)}
</div>
</div>

<div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
<div className="p-6">
<h2 className="text-2xl font-semibold mb-6">Your Skills</h2>

<div className="grid grid-cols-1 gap-4">
{profile && Object.entries(profile.skillScores).map(([skill, score]) => (
<div key={skill} className="mb-4">
<div className="flex justify-between mb-1">
<span className="font-medium text-gray-700">{skill}</span>
<span>{score}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div 
className="bg-indigo-600 h-2.5 rounded-full" 
style={{ width: `${score}%` }}
></div>
</div>
</div>
))}
</div>
</div>
</div>

<div className="bg-white shadow-md rounded-lg overflow-hidden">
<div className="p-6">
<h2 className="text-2xl font-semibold mb-6">Company Matches</h2>

<div className="space-y-4">
{profile && profile.matches.map((match, index) => (
<div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
<div className="flex justify-between items-center">
<h3 className="text-lg font-medium">{match.company}</h3>
<span className={`font-bold ${match.matchPercentage >= 90 ? 'text-green-600' : match.matchPercentage >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
{match.matchPercentage}% Match
</span>
</div>
<p className="text-gray-600 text-sm mt-1">
{match.matchPercentage >= 90 ? 'Excellent fit for your skills and preferences!' : 
match.matchPercentage >= 75 ? 'Good match with some alignment in skills and culture.' : 
'Partial match - might require skill development.'}
</p>
</div>
))}
</div>
</div>
</div>
</div>
);
};

export default Profile;