import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import ScrollReveal from 'scrollreveal'; // Import ScrollReveal
import './Eligibility.css'; // Ensure you have a corresponding CSS file for styling.

const Eligibility = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [eligibility, setEligibility] = useState(null);

  // ScrollReveal Setup
  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 500,
      delay: 100,
      reset: true,
    });

    sr.reveal('.eligibility-card', { interval: 200 });
    sr.reveal('.input-field', { interval: 100 });
    sr.reveal('.check-button', { origin: 'left', delay: 300 });
  }, []);

  const checkEligibility = () => {
    if (!age || !weight || !height || !bloodType || !donationDate || !medicalCondition) {
      const alertDiv = document.createElement('div');
      alertDiv.textContent = 'Please fill in all the fields to check eligibility.';
      alertDiv.style.position = 'fixed';
      alertDiv.style.top = '20px';
      alertDiv.style.left = '50%';
      alertDiv.style.transform = 'translateX(-50%)';
      alertDiv.style.padding = '10px 20px';
      alertDiv.style.backgroundColor = '#f44336'; // Red background
      alertDiv.style.color = 'white';
      alertDiv.style.borderRadius = '5px';
      alertDiv.style.zIndex = 9999;
      document.body.appendChild(alertDiv);
      setTimeout(() => {
        alertDiv.style.display = 'none';
      }, 1000);
      return;
    }

    const lastDonationDate = new Date(donationDate);
    const today = new Date();
    const minDonationInterval = 90; // 90 days between donations
    const timeDifference = Math.floor((today - lastDonationDate) / (1000 * 3600 * 24));

    if (
      age >= 18 &&
      age <= 65 &&
      weight >= 50 &&
      height >= 150 &&
      bloodType &&
      medicalCondition === 'No medical conditions' &&
      timeDifference >= minDonationInterval
    ) {
      setEligibility(
        <Alert variant="success">
          🎉 You are eligible to donate blood! Thank you for your willingness to help save lives.
        </Alert>
      );
    } else {
      const reason =
        medicalCondition !== 'No medical conditions'
          ? `Disqualifying condition: ${medicalCondition}.`
          : 'Ensure you meet the age, weight, and time interval requirements.';
      setEligibility(
        <Alert variant="danger">
          🚫 Sorry, you are not eligible to donate blood. {reason}
        </Alert>
      );
    }
  };

  return (
    <div className="container py-5" id="eligible-section">
      <Card className="eligibility-card">
        <Card.Body>
          <Card.Title className="text-center mb-4 title">Blood Donation Eligibility</Card.Title>
          <Card.Text className="text-center mb-4 description">
            Your health matters. Check if you are eligible to donate blood and help save lives today!
          </Card.Text>

          <Form>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label>Weight (in kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formHeight">
              <Form.Label>Height (in cm)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formBloodType">
              <Form.Label>Blood Type</Form.Label>
              <Form.Control
                as="select"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="input-field"
              >
                <option value="">Select Blood Type</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
                <option>A-</option>
                <option>B-</option>
                <option>O-</option>
                <option>AB-</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDonationDate">
              <Form.Label>Last Blood Donation Date</Form.Label>
              <Form.Control
                type="date"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formMedicalCondition">
              <Form.Label>Medical Condition</Form.Label>
              <Form.Control
                as="select"
                value={medicalCondition}
                onChange={(e) => setMedicalCondition(e.target.value)}
                className="input-field"
              >
                <option value="">Select Medical Condition</option>
                <option>No medical conditions</option>
                <option>HIV/AIDS</option>
                <option>Hepatitis B or C</option>
                <option>Cancer (currently undergoing treatment)</option>
                <option>Pregnancy</option>
                <option>Heart Disease</option>
                <option>Diabetes (on insulin)</option>
                <option>Chronic Kidney Disease</option>
                <option>Tuberculosis (active or untreated)</option>
                <option>Epilepsy (uncontrolled seizures)</option>
                <option>Blood Disorders (e.g., hemophilia)</option>
                <option>Recent Surgery (within the last 6 months)</option>
                <option>Recent Malaria (within the last 3 months)</option>
                <option>Use of Certain Medications (e.g., antibiotics, blood thinners)</option>
              </Form.Control>
            </Form.Group>

            <div className="text-center mt-4">
              <Button variant="primary" onClick={checkEligibility} className="check-button">
                Check Eligibility
              </Button>
            </div>
          </Form>

          {eligibility && <div className="mt-4 text-center">{eligibility}</div>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Eligibility;
