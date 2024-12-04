import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert, Table } from "react-bootstrap";
import { FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";

const OrganizationDashboard = () => {
  const [recentCamps, setRecentCamps] = useState([]);
  const [campHistory, setCampHistory] = useState([]);
  const [newCamp, setNewCamp] = useState({
    organization: "",
    place: "",
    date: "",
    time: "",
    contact: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    setFetching(true);
    try {
      const recent = await fetchRecentCamps();
      const history = await fetchCampHistory();

      setRecentCamps(recent.data || []);
      setCampHistory(history.data || []);
    } catch (error) {
      console.error("Error fetching camps:", error);
      setError("Failed to load camp data. Please try again later.");
    } finally {
      setFetching(false);
    }
  };

  const fetchRecentCamps = async () => {
    try {
      const { data } = await API.get("/camp/camps/recent");
      return data;
    } catch (error) {
      console.error("Error fetching recent camps:", error);
      throw error;
    }
  };

  const fetchCampHistory = async () => {
    try {
      const { data } = await API.get("/camp/camps/history");
      return data;
    } catch (error) {
      console.error("Error fetching camp history:", error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCamp((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCamp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createCamp(newCamp);
      setNewCamp({
        organization: "",
        place: "",
        date: "",
        time: "",
        contact: "",
        details: "",
      });
      fetchCamps();
    } catch (error) {
      console.error("Error adding camp:", error);
      setError("Failed to add the camp. Please try again later.");
    }
    setLoading(false);
  };

  const createCamp = async (campData) => {
    try {
      const { data } = await API.post("/camp/camps", campData);
      return data;
    } catch (error) {
      console.error("Error creating camp:", error);
      throw error;
    }
  };

  return (
    <Layout>
      <Container fluid className="py-4">
        <h1 className="text-center text-danger mb-4 fs-2">
          <FaPlus className="me-2" />
          Organization Dashboard
        </h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="mb-4 shadow-lg border-0" data-aos="fade-up">
          <Card.Body>
            <h2 className="text-danger fs-4">Add New Blood Donation Camp</h2>
            <Form onSubmit={handleAddCamp}>
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="organization"
                    value={newCamp.organization}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Label>Place</Form.Label>
                  <Form.Control
                    type="text"
                    name="place"
                    value={newCamp.place}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="g-3 mt-2">
                <Col xs={12} sm={6}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newCamp.date}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    placeholder="e.g., 10:00 AM - 4:00 PM"
                    value={newCamp.time}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="g-3 mt-2">
                <Col xs={12}>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={newCamp.contact}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Form.Group className="mt-3">
                <Form.Label>Additional Details</Form.Label>
                <Form.Control
                  as="textarea"
                  name="details"
                  rows={3}
                  value={newCamp.details}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="danger"
                type="submit"
                className="w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Camp"}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <h2 className="text-danger fs-4 mb-3">Recent Blood Donation Camps</h2>
        <Row className="g-4">
          {fetching ? (
            <p>Loading camps...</p>
          ) : (
            recentCamps.map((camp) => (
              <Col xs={12} sm={6} md={4} key={camp.id}>
                <Card
                  className="shadow-lg border-0 h-100"
                  data-aos="fade-up"
                  style={{ borderRadius: "10px" }}
                >
                  <Card.Body>
                    <h5 className="text-danger">{camp.organization}</h5>
                    <p>
                      <FaMapMarkerAlt className="me-2" />
                      <strong>Place:</strong> {camp.place}
                    </p>
                    <p>
                      <FaCalendarAlt className="me-2" />
                      <strong>Date:</strong> {camp.date}
                    </p>
                    <p>
                      <FaClock className="me-2" />
                      <strong>Time:</strong> {camp.time}
                    </p>
                    <p>
                      <FaPhone className="me-2" />
                      <strong>Contact:</strong> {camp.contact}
                    </p>
                    <p className="text-muted small">{camp.details}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <h2 className="text-danger fs-4 mb-3 mt-5">History of Conducted Camps</h2>
        <Card className="shadow-lg border-0" data-aos="fade-up">
          <Card.Body>
            {fetching ? (
              <p>Loading camp history...</p>
            ) : (
              <Table striped hover responsive="md" className="align-middle text-center">
                <thead className="table-danger">
                  <tr>
                    <th>#</th>
                    <th>Organization</th>
                    <th>Place</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Contact</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {campHistory.map((camp, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{camp.organization}</td>
                      <td>{camp.place}</td>
                      <td>{camp.date}</td>
                      <td>{camp.time}</td>
                      <td>{camp.contact}</td>
                      <td>{camp.details}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default OrganizationDashboard;