import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { Container, Row, Col, Alert } from "react-bootstrap"; // Import Bootstrap components
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import the AOS CSS
import "./Login.css";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    navigate("/"); // Navigate to the landing page
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration
      easing: 'ease-in-out', // Set easing function
      once: true, // Ensures animation triggers once on scroll or load
    });
  }, []);

  return (
    <Container fluid className="login-page">
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
            className="login-container"
            data-aos="fade-up" // AOS animation for fade-up
          >
            <div className="form-wrapper">
              <div className="form-banner position-relative">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-camp-5526365-4620411.png"
                  alt="loginImage"
                  className="img-fluid" // Ensures the image is responsive
                  data-aos="zoom-in" // Zoom-in animation for image
                />
                <button className="close-btn" onClick={handleClose}>X</button> {/* Close button with navigation */}
              </div>
              <div className="form-content">
                <Form
                  formTitle={"Login"}
                  submitBtn={"Login"}
                  formType={"login"}
                />
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Login;
