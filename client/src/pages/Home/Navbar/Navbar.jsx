import { Link, NavLink } from "react-router-dom";
import React,{ useState } from "react";
import { Navbar, Nav, Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";

const CustomNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Navbar
      expand="lg"
      className="custom-navbar p-3"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        transition: "0.3s",
        zIndex: 1050,
        padding: "0 1rem",
      }}
    >
      <Container fluid>
        <Row className="align-items-center w-100">
          {/* Logo */}
          <Col xs={6} lg={3} className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
              <span className="fw-bold text-white fs-4"></span>
            </Navbar.Brand>
          </Col>

          {/* Desktop Navigation */}
          <Col lg={6} className="d-none d-lg-flex justify-content-center">
            <Nav className="gap-4">
              <Nav.Link
                as={NavLink}
                to="/"
                className="fs-6 text-white fw-semibold clickable nav-link-red"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/register"
                className="fs-6 text-white fw-semibold clickable nav-link-red"
              >
                Donation Request
              </Nav.Link>
              <ScrollLink
                to="about-section"
                smooth={true}
                duration={500}
                className="nav-link fs-6 text-white fw-semibold scroll-link clickable nav-link-red"
              >
                About Us
              </ScrollLink>
              <ScrollLink
                to="blog-section"
                smooth={true}
                duration={500}
                className="nav-link fs-6 text-white fw-semibold scroll-link clickable nav-link-red"
              >
                Blog
              </ScrollLink>
              <ScrollLink
                to="eligible-section"
                smooth={true}
                duration={500}
                className="nav-link fs-6 text-white fw-semibold scroll-link clickable nav-link-red"
              >
                Eligibility
              </ScrollLink>
            </Nav>
          </Col>

          {/* Login Button and Hamburger Menu */}
          <Col xs={6} lg={3} className="d-flex justify-content-end align-items-center gap-3 clickable">
            <Button
              as={NavLink}
              to="/login"
              className="btn-danger text-white d-flex align-items-center gap-2 px-4 py-2 rounded-pill clickable"
            >
              <FiLogIn className="fs-5" />
              Login
            </Button>

            {/* Hamburger Menu for small screens - Now in black */}
            <Navbar.Toggle
              aria-controls="offcanvas-navbar"
              onClick={() => setOpen(!open)}
              className="border-0 d-lg-none" // Only appears on small screens
              style={{
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
              <GiHamburgerMenu className="fs-3" style={{ color: 'white' }} />
            </Navbar.Toggle>
          </Col>
        </Row>
      </Container>

      {/* Offcanvas Menu for Small Screens */}
      <Offcanvas show={open} onHide={() => setOpen(false)} placement="end" className="offcanvas-menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-danger fs-4">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <Nav.Link
              as={NavLink}
              to="/"
              className="text-secondary fs-6"
              onClick={() => setOpen(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/register"
              className="text-secondary fs-6"
              onClick={() => setOpen(false)}
            >
              Donation Request
            </Nav.Link>
            <ScrollLink
              to="about-section"
              smooth={true}
              duration={500}
              className="nav-link text-secondary fs-6 scroll-link"
              onClick={() => setOpen(false)}
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="blog-section"
              smooth={true}
              duration={500}
              className="nav-link text-secondary fs-6 scroll-link"
              onClick={() => setOpen(false)}
            >
              Blog
            </ScrollLink>
            <ScrollLink
              to="eligible-section"
              smooth={true}
              duration={500}
              className="nav-link text-secondary fs-6 scroll-link"
              onClick={() => setOpen(false)}
            >
              Eligibility
            </ScrollLink>
            <Nav.Link
              as={NavLink}
              to="/login"
              className="btn btn-danger text-white d-flex align-items-center gap-2 fs-6 fw-bold rounded-pill px-3 py-2"
              onClick={() => setOpen(false)}
            >
              <FiLogIn />
              Login
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default CustomNavbar;