import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Table } from "react-bootstrap";
import { FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";

const OrganizationDashboard = () => {
  const [recentCamps, setRecentCamps] = useState([]); 
  const [campHistory, setCampHistory] = useState([]); 
  const [fetching, setFetching] = useState(false); 
  const [error, setError] = useState(null); 
  const [activeDetails, setActiveDetails] = useState(null); 

  useEffect(() => {
    AOS.init({ duration: 1200 });
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    setFetching(true);
    try {
      const recent = await fetchRecentCamps();
      const history = await fetchCampHistory();

      setRecentCamps(
        Array.isArray(recent.data) ? recent.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3) : []
      );

      setCampHistory(
        Array.isArray(history.data) 
          ? history.data.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
          : []
      );
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

  const toggleDetails = (index) => {
    setActiveDetails(activeDetails === index ? null : index);
  };

  return (
    <Layout>
      <Container fluid className=" ">
        <div className="container ">
          <h1 className="text-center ">Blood Donation Camps</h1>
          <p className="text-center">
  Discover both upcoming and past camps, featuring essential details like schedules, locations, and planned activities. Stay informed with the latest camp news, and browse experiences from past participants to guide you in selecting your next camp adventure. Don’t miss out on the exciting opportunities ahead!
</p>



          {/* Loading Spinner */}
          {fetching && (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
        
          {/* Error Message */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Recent Camps Section */}
          <h2 className="text-danger fs-4 mt-5 mb-3">Recent Blood Donation Camps</h2>
          <Row className="g-4">
            {recentCamps.length === 0 ? (
              <p >No recent camps found.</p>
            ) : (
              recentCamps.map((camp, index) => (
                <Col xs={12} sm={6} md={4} key={index}>
                  <Card className="card border-0 shadow-lg rounded border-0 h-100 mt-2" data-aos="fade-up">
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
                      <button
                        className="btn btn-outline-primary btn-sm w-100 view-details-btn"
                        onClick={() => toggleDetails(index)}
                      >
                        {activeDetails === index ? "Hide Details" : "View Details"}
                      </button>
                      {activeDetails === index && (
                        <div className="mt-3 details-section" data-aos="fade-down">
                          <p className="text-muted">{camp.details}</p>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>

          {/* History of Conducted Camps in Table */}
          <h2 className="text-danger fs-4 mb-3 mt-5">Camps History</h2>
          <Table striped bordered hover responsive className="shadow-lg" data-aos="fade-left" style={{ opacity: fetching ? 0.5 : 1 }}>
            <thead className="bg-dark text-white">
              <tr>
                <th>Organization</th>
                <th>Place</th>
                <th>Date</th>
                <th>Time</th>
                <th>Contact</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan="6">Loading camp history...</td>
                </tr>
              ) : (
                campHistory.length === 0 ? (
                  <tr>
                    <td colSpan="6">No camp history available.</td>
                  </tr>
                ) : (
                  campHistory.map((camp, index) => (
                    <tr key={index} data-aos="zoom-in">
                      <td>{camp.organization}</td>
                      <td>{camp.place}</td>
                      <td>{camp.date}</td>
                      <td>{camp.time}</td>
                      <td>{camp.contact}</td>
                      <td>{camp.details}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </Layout>
  );
};

export default OrganizationDashboard;
