import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import './CourseDetails.css'; // Import custom CSS

const CourseDetails = () => {
  const location = useLocation();
  const { courseName, courseCode } = location.state || {};

  if (!courseName || !courseCode) {
    return <div>No course data found.</div>;
  }

  // Sample data
  const totalClasses = 30; // Total number of classes
  const studentAttendance = {
    'John Doe': 80, // Attendance percentage for John Doe
    'Jane Smith': 90  // Attendance percentage for Jane Smith
  };
  const classAverageAttendance = 85; // Average attendance of the class

  return (
    <Container className="course-details-container">
      <h2 className="text-center">Course Details</h2>
      <Card>
        <Card.Header>
          <h3>{courseName} - {courseCode}</h3>
        </Card.Header>
        <Card.Body>
          {/* Total Classes */}
          <h5>Total Lecture Count:</h5>
          <p>The total lecture count for the course is {totalClasses}.</p>
          
          {/* Student Attendance Percentage */}
          <h5>Student Attendance Percentage:</h5>
          <p>
            <strong>John Doe's Attendance:</strong>
            <ProgressBar now={studentAttendance['John Doe']} label={`${studentAttendance['John Doe']}%`} />
            <br />
          </p>

          {/* Average Class Attendance */}
          <h5>Average Attendance of the Class:</h5>
          <p>
            The average attendance percentage of the class is {classAverageAttendance}%.
            <br />
            <ProgressBar now={classAverageAttendance} label={`${classAverageAttendance}%`} />
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CourseDetails;
