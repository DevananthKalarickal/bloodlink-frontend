import React, { useState, useEffect } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ email: "", description: "" });
  const [viewTicket, setViewTicketModal] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for better UX

  const userId = "userId_placeholder";

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await API.post("/Ticket/tickets/history", { userId });
      if (data.success) {
        setTickets(data.tickets);
      } else {
        console.error("Error fetching ticket history");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleTicketSubmit = async () => {
    setLoading(true); // Set loading to true while the request is in progress
    try {
      const { data } = await API.post("/Ticket/tickets/create", {
        email: newTicket.email,
        description: newTicket.description,
        userId,
      });

      if (data.success) {
        setTickets((prevTickets) => [...prevTickets, data.ticket]);
        setNewTicket({ email: "", description: "" });
      } else {
        console.error("Error creating ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Filter and sort tickets
  const filteredTickets = tickets
    .filter(
      (ticket) =>
        ticket.status === "Submitted" ||
        ticket.status === "Resolved" ||
        ticket.status === "In Progress"
    )
    .sort((a, b) => {
      const statusPriority = {
        "In Progress": 1,
        Submitted: 2,
        Resolved: 3,
      };
      return statusPriority[a.status] - statusPriority[b.status];
    });

  return (
    <Layout>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-danger fw-bold">
              <i className="fas fa-ticket-alt me-2"></i>Ticket Management
            </h1>
          </Col>
        </Row>

        {/* New Ticket Form */}
        <Row className="mb-5">
          <Col>
            <div className="p-4 bg-white shadow-sm rounded">
              <h3 className="text-danger mb-4">Submit a New Ticket</h3>
              <Form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  handleTicketSubmit(); // Call ticket submission function
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={newTicket.email}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Issue Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Describe your issue"
                    value={newTicket.description}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  className="w-100"
                  type="submit"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Submitting..." : "Submit Ticket"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        {/* Tickets Table */}
        <Row>
          <Col>
            <div className="bg-white shadow-sm rounded p-4">
              <h3 className="text-danger mb-4">Your Tickets</h3>
              <Table striped hover responsive className="align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket, index) => (
                    <tr key={ticket.ticketId}>
                      <td>{index + 1}</td>
                      <td>{ticket.email}</td>
                      <td>{ticket.description}</td>
                      <td>
                        <Badge
                          bg={
                            ticket.status === "Submitted"
                              ? "warning"
                              : ticket.status === "In Progress"
                              ? "primary"
                              : "success"
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => setViewTicketModal(ticket)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        {/* View Ticket Modal */}
        {viewTicket && (
          <Modal
            show={!!viewTicket}
            onHide={() => setViewTicketModal(null)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Ticket Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Ticket ID:</strong> {viewTicket._id}
              </p>
              <p>
                <strong>Email:</strong> {viewTicket.email}
              </p>
              <p>
                <strong>Description:</strong> {viewTicket.description}
              </p>
              <p>
                <strong>Status:</strong> {viewTicket.status}
              </p>
              <p>
                <strong>Admin Note:</strong> {viewTicket.adminNote || "N/A"}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                onClick={() => setViewTicketModal(null)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </Layout>
  );
};

export default App;
