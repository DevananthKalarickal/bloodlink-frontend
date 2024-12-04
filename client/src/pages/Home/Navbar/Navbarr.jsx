import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";
import React from 'react';

const CustomNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Navbar
      expand="lg"
      className="shadow-sm p-3"
      style={{
        backgroundColor: "red",
        borderRadius: "10px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1050,
      }}
    >
      <Container fluid >
        {/* Centered Navigation Links */}
        <Nav className="mx-auto d-none d-lg-flex gap-4">
          <Nav.Link
            as={NavLink}
            to="/"
            className="fs-6 text-white fw-semibold clickable"
            style={{ textDecoration: "none" }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/register"
            className="fs-6 text-white fw-semibold clickable"
            style={{ textDecoration: "none" }}
          >
            Donation Request
          </Nav.Link>
        </Nav>

        {/* Login Button and Hamburger Menu */}
        <div className="d-flex align-items-center gap-3">
          
          <Navbar.Toggle
            aria-controls="offcanvas-navbar"
            onClick={() => setOpen(!open)}
            className="border-0 d-lg-none"
            style={{
              backgroundColor: "red",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            <GiHamburgerMenu className="fs-3" style={{ color: "white" }} />
          </Navbar.Toggle>
        </div>
      </Container>

      {/* Offcanvas Menu */}
      <Offcanvas
        show={open}
        onHide={() => setOpen(false)}
        placement="end"
        className="offcanvas-menu"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-danger fs-4">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3 mt-3">
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