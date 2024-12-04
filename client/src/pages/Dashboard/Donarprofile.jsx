
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { FaUserTie, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles

const Donation = () => {
  const { user } = useSelector((state) => state.auth); // User from Redux store
  const [data, setData] = useState(null); // Store user data
  const [donorInfo, setDonorInfo] = useState({}); // Editable user info
  const [show, setShow] = useState(false); // Modal visibility
  const [formData, setFormData] = useState({}); // Form data for editing

  // Fetch donor data
  const getDonorData = async () => {
    try {
      const response = await API.post("/inventory/get-user", { userId: user._id });
      if (response.data.success) {
        setData(response.data.user);
        setDonorInfo(response.data.user); // Initialize editable info
      } else {
        console.error("Failed to fetch donor data");
      }
    } catch (error) {
      console.error("Error fetching donor data:", error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated profile
  const handleSubmit = async () => {
    try {
      const response = await API.put("/donor/update-profile", {
        userId: donorInfo._id,
        ...formData,
      });
      if (response.data.success) {
        setDonorInfo(response.data.user); // Update state with new data
        getDonorData(); // Fetch latest data
        setShow(false); // Close modal
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getDonorData();
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <Layout>
      <Card
        className="shadow-lg mx-auto mt-4"
        style={{
          maxWidth: "650px",
          background: "linear-gradient(to right, #f8f9fa, #ffffff)",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        }}
        data-aos="fade-up"
      >
        {/* Header with Icon */}
        <div
          className="d-flex align-items-center justify-content-center p-4"
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            borderBottom: "4px solid #bd2130",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <FaUser size={40} />
          <h3 className="ms-3 mb-0" style={{ fontFamily: "Roboto, sans-serif", fontWeight: "bold" }}>
            Donor Profile
          </h3>
        </div>

        <Card.Body className="p-4">
          {/* Donor Info Section */}
          <Row>
            <Col xs={12}>
              <div className="d-flex gap-2 align-items-center mb-3" data-aos="fade-left">
                <FaUserTie className="text-danger" />
                <strong className="me-2" style={{ fontSize: "1.1rem", color: "#495057" }}>Name:</strong>
                <span className="text-secondary">{donorInfo.name || "N/A"}</span>
              </div>
              <div className="d-flex gap-2 align-items-center mb-3" data-aos="fade-left">
                <FaEnvelope className="text-danger" />
                <strong className="me-2" style={{ fontSize: "1.1rem", color: "#495057" }}>Email:</strong>
                <span className="text-secondary">{donorInfo.email || "N/A"}</span>
              </div>
              <div className="d-flex gap-2 align-items-center mb-3" data-aos="fade-left">
                <FaPhone className="text-danger" />
                <strong className="me-2" style={{ fontSize: "1.1rem", color: "#495057" }}>Contact:</strong>
                <span className="text-secondary">{donorInfo.phone || "N/A"}</span>
              </div>
              <div className="d-flex gap-2 align-items-center mb-3" data-aos="fade-left">
                <FaGlobe className="text-danger" />
                <strong className="me-2" style={{ fontSize: "1.1rem", color: "#495057" }}>Website:</strong>
                <span className="text-secondary">{donorInfo.website || "N/A"}</span>
              </div>
              <div className="d-flex gap-2 align-items-center mb-3" data-aos="fade-left">
                <FaMapMarkerAlt className="text-danger" />
                <strong className="me-2" style={{ fontSize: "1.1rem", color: "#495057" }}>Location:</strong>
                <span className="text-secondary">{donorInfo.address || "N/A"}</span>
              </div>
            </Col>
          </Row>
          <Button
            variant="danger"
            onClick={() => {
              setFormData(donorInfo);
              setShow(true);
            }}
            style={{
              backgroundColor: "#dc3545",
              border: "none",
              padding: "10px 30px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "30px",
              transition: "background-color 0.3s",
            }}
          >
            Edit Profile
          </Button>
        </Card.Body>
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="modal-90w"
        style={{
          borderRadius: "15px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "30px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "30px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "30px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "30px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "30px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Donation;
