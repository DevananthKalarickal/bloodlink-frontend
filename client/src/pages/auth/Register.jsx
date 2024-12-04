import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { Container, Row, Col, Alert } from "react-bootstrap";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS
import "./Register.css";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize navigate for navigation

  // Function to handle close button click
  const handleClose = () => {
    navigate("/"); // Navigate to the landing page
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration (in ms)
      easing: 'ease-in-out', // Set easing function for the animations
      once: true, // Ensure animation triggers only once when the element comes into view
    });
  }, []);

  return (
    <Container fluid className="register-page">
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <Row className="justify-content-center align-items-center full-height">
          <Col
            xs={12}
            md={8}
            lg={6}
            className="register-container"
            data-aos="fade-up" // AOS animation for fade-up effect
          >
            <div className="form-wrapper">
              <div
                className="form-banner"
                data-aos="zoom-in" // AOS animation for zoom-in effect
              >
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/woman-donate-blood-in-blood-donation-camp-at-hospital-8123144-6477085.png"
                  alt="registerImage"
                  className="img-fluid"
                />
                {/* Closing Button */}
                <button
                  className="close-btn"
                  onClick={handleClose}
                  data-aos="fade-right" // AOS animation for fade-right effect on button
                >
                  X
                </button>
              </div>
              <div className="form-content">
                <Form
                  formTitle={"Register"}
                  submitBtn={"Register"}
                  formType={"register"}
                />
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Register;
