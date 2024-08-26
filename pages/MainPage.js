// src/pages/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './MainPage.css';




const MainPage = () => {
  const navigate = useNavigate(); // Define navigate

  const handleNavigation = (role) => {
    if (role === 'student') {
      navigate('/student'); // Navigate to Student Page
    } else if (role === 'faculty') {
      // Optionally handle navigation for faculty if needed
      navigate('/facultyprofile');
    }
  };
  return (
    <div className="main-page">
      <div className="main-container">
        <div className="title">
          <h1>IITR Attendance Portal</h1>
        </div>
        <div className="box-container">
          <div className="box" onClick={() => navigate('/loginp')}>
            <span>Faculty</span>
          </div>
          <div className="box" onClick={() => navigate('/login')}>
            <span>Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
