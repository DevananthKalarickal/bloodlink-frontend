import React, { useState, useEffect } from "react";
import Navbarr from "../Navbar/Navbarr.jsx";
import Footer from "../Footer/Footer";
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Readmore = () => {
    // State to track window width for responsive design
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({ duration: 1000, delay: 200 }); // Adjusted for smoother animation
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // Update window width on resize
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="mx-auto overflow-x-hidden">
            <Navbarr />

            {/* About Us Section */}
            <div
                className="about-section m-3 mt-5"
                id="about-section"
                style={{
                    display: 'flex',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f5f5f5',
                }}
            >
                <Container>
                    <Row className="align-items-center">
                        {/* Image Column */}
                        <Col xs={12} md={6} className="order-2 order-md-1 mt-5 mb-4 mb-md-0">
                            <div
                                className="background-image"
                                data-aos="fade-left" // Animation when the image comes into view
                                style={{
                                    width: '100%',
                                    height: windowWidth <= 567 ? '300px' : '500px',
                                    backgroundImage: `url("https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-drive-5526362-4620408.png")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                }}
                                alt="Blood donation drive illustration" // Added alt attribute for accessibility
                            ></div>
                        </Col>

                        {/* Text Column */}
                        <Col xs={12} md={6} className="order-1 order-md-2">
                            <div
                                data-aos="fade-right" // Animation when the text comes into view
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
                                >
                                    About Us
                                </h2>
                                <p
                                    className="lead mb-4"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '1.6',
                                    }}
                                >
                                    Our mission is to provide the highest quality care for all, ensuring a better and healthier future for our community.
                                    We believe in the power of collaboration, innovation, and a deep commitment to patient care. 
                                    Through our initiatives, we strive to bring lifesaving resources to those in need and raise awareness about the importance of blood donation.
                                    Together, we aim to create a stronger, healthier society where no one faces medical emergencies alone. 
                                    Join us in making a difference today!
                                </p>
                                <p>
                                    <strong>Contact Us:</strong> For more information or to get involved, email us at{' '}
                                    <a href="mailto:bloodlink@example.com" style={{ color: '#007bff' }}>
                                        bloodlink@example.com
                                    </a>.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer style={{ padding: '20px', backgroundColor: '#333', color: 'white', textAlign: 'center' }} />
        </div>
    );
};

export default Readmore;
