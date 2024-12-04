import React, { useState, useEffect } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  // State to track window width for responsiveness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens once
    });

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inline style for the responsive image
  const imageStyle = {
    width: '100%',
    height: windowWidth <= 567 ? '300px' : '500px',
    backgroundImage: `url("https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-drive-5526362-4620408.png")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  };

  const handleLearnMoreClick = () => {
    navigate('/Readmore');
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="about-section"
      id="about-section"
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        overflow: 'hidden', // Ensure no overflow during animations
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Image Column */}
          <Col
            xs={12} md={6}
            className="order-2 order-md-1 mb-4 mb-md-0"
            data-aos="zoom-in-up" // Apply animation here
          >
            <div
              className="background-image"
              style={imageStyle}
            ></div>
          </Col>

          {/* Text Column */}
          <Col
            xs={12} md={6}
            className="order-1 order-md-2"
            data-aos="fade-left" // Apply animation here
          >
            <div
              style={{
                color: '#333',
                padding: '15px',
                textAlign: 'center',
              }}
            >
              <h2
                className="display-4 mb-4"
                style={{
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                }}
                data-aos="fade-up" // Apply animation here
              >
                About Us
              </h2>
              <p
                className="lead mb-4"
                style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.6',
                }}
                data-aos="fade-up" // Apply animation here
              >
                Our mission is to provide the highest quality care for all,
                ensuring a better and healthier future for our community. We
                believe in the power of collaboration, innovation, and a deep
                commitment to patient care.
              </p>
              <Button
                variant="danger"
                size="lg"
                style={{
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                }}
                onClick={handleLearnMoreClick}
                data-aos="flip-up" // Apply animation here
              >
                Read More →
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
