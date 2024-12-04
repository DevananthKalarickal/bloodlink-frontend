import { FaUsers, FaTrophy } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import React from 'react';

const Stats = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      delay: 100,
      reset: true, // Animations reset when re-entering the viewport
    });

    sr.reveal(".stat-card", {
      interval: 200, // Delay between animations for elements
    });
  }, []);

  const statIconStyle = {
    fontSize: "4rem",
    transition: "transform 0.3s ease",
  };

  const statNumberStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    transition: "transform 0.3s ease",
  };

  return (
    <Container fluid className="bg-dark text-light py-3 mt-5 mb-2">
      <Row className="d-flex flex-wrap flex-md-nowrap justify-content-center">
        {/* Happy Donors */}
        <Col xs={12} md={3} className="d-flex flex-column align-items-center mb-2 stat-card">
          <Card.Body className="d-flex flex-column align-items-center">
            <FaUsers className="text-danger" style={statIconStyle} />
            <p className="h2" style={statNumberStyle}>200</p>
            <p className="h5">Happy Donors</p>
          </Card.Body>
        </Col>

        {/* Blood Groups */}
        <Col xs={12} md={3} className="d-flex flex-column align-items-center mb-2 stat-card">
          <Card.Body className="d-flex flex-column align-items-center">
            <IoIosWater className="text-danger" style={statIconStyle} />
            <p className="h2" style={statNumberStyle}>08</p>
            <p className="h5">Blood Groups</p>
          </Card.Body>
        </Col>

        {/* Success Smile */}
        <Col xs={12} md={3} className="d-flex flex-column align-items-center mb-2 stat-card">
          <Card.Body className="d-flex flex-column align-items-center">
            <FaHandshake className="text-danger" style={statIconStyle} />
            <p className="h2" style={statNumberStyle}>45</p>
            <p className="h5">Success Smile</p>
          </Card.Body>
        </Col>

        {/* Total Awards */}
        <Col xs={12} md={3} className="d-flex flex-column align-items-center mb-2 stat-card">
          <Card.Body className="d-flex flex-column align-items-center">
            <FaTrophy className="text-danger" style={statIconStyle} />
            <p className="h2" style={statNumberStyle}>90</p>
            <p className="h5">Total Awards</p>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
