import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineBloodtype } from "react-icons/md";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom" sticky="top">
      <Container fluid>
        {/* Brand */}
        <div className="d-flex align-items-center">
          <Navbar.Brand href="#" className="brand me-3">
            <MdOutlineBloodtype className="brand-icon" />
            <span className="highlight">BloodLink</span>
          </Navbar.Brand>
        </div>

        {/* Navbar Toggle Button for Collapsing */}
        <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* User Greeting */}
            <Nav.Item className="me-4">
              {user ? (
                <span className="user-greeting">
                  <BiUserCircle className="user-icon" />
                  Welcome{" "}
                  {user.name || user.hospitalName || user.organisationName}{" "}
                  <Badge bg="secondary" className="role-badge">
                    {user.role}
                  </Badge>
                </span>
              ) : (
                <span className="guest-greeting">Welcome, Guest</span>
              )}
            </Nav.Item>

            {/* Conditional Links */}
            
            {user?.role !== "admin" && (
  <Nav.Item className="me-4">
    <Link to="/analytics" className="nav-link">
      Analytics
    </Link>
  </Nav.Item>
)}


         
                <Nav.Item className="me-4">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </Nav.Item>
              

            {/* Logout Button */}
            {user && (
              <Nav.Item>
                <Button onClick={handleLogout} className="logout-btn">
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
