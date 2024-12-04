import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap"; // Importing necessary components from react-bootstrap

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Container fluid className="mt-3"> {/* Container component */}
        <Row>
          {/* Sidebar */}
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          {/* Main Content */}
          <Col xs={12} md={9} lg={10} className="p-4">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
