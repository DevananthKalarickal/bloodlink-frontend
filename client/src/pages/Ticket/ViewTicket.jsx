


import React, { useState, useEffect } from "react";
import API from "../../services/API"; // Import the API service

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    email: "",
    description: "",
  });
  const [viewTicket, setViewTicketModal] = useState(null);
  
  const userId = "userId_placeholder"; // Replace with actual user ID from authentication context or state

  // Fetch ticket history when the component mounts
  useEffect(() => {
    fetchTickets();
  }, []);

  // Function to fetch the ticket history using API
  const fetchTickets = async () => {
    try {
      const { data } = await API.post("/Ticket/tickets/history", {
        userId: userId, // Send user ID dynamically if available
      });

      if (data.success) {
        setTickets(data.tickets);
      } else {
        console.error("Error fetching ticket history");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Handle ticket submission
  const handleTicketSubmit = async () => {
    try {
      const { data } = await API.post("/Ticket/tickets/create", {
        email: newTicket.email,
        description: newTicket.description,
        userId: userId, // Pass userId dynamically
      });

      if (data.success) {
        setTickets((prevTickets) => [...prevTickets, data.ticket]);
        setNewTicket({ email: "", description: "" });
      } else {
        console.error("Error creating ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  // Handle updating ticket status
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const { data } = await API.put("/Ticket/tickets/update-status", {
        ticketId,
        status: newStatus,
        adminNote: "Admin note updated", // You can replace this with dynamic input
      });

      if (data.success) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.ticketId === ticketId ? { ...ticket, status: newStatus } : ticket
          )
        );
      } else {
        console.error("Error updating ticket status");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewTicket({
      ...newTicket,
      [e.target.name]: e.target.value,
    });
  };

  // Filter and sort tickets to show only "Submitted" or "Resolved" statuses
  const filteredTickets = tickets
    .filter((ticket) => ticket.status === "Submitted" || ticket.status === "Resolved")
    .sort((a, b) => {
      if (a.status === "Submitted" && b.status !== "Submitted") return -1;
      if (a.status === "Resolved" && b.status !== "Resolved") return 1;
      return new Date(b.createdTime) - new Date(a.createdTime);
    });

  return (
    <div className="container mt-5">
      <h1 className="d-flex align-items-center">
        <i className="fas fa-ticket-alt mr-2" style={{ color: "red" }}></i>
        Ticket Management
      </h1>

      {/* User Ticket Form */}
      <div className="mb-4">
        <h3>Submit a New Ticket</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={newTicket.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Issue Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={newTicket.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleTicketSubmit}>
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Tickets Table */}
      <h3>Your Tickets</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            <th>Admin Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket, index) => (
            <tr key={ticket.ticketId} style={{ backgroundColor: ticket.status === "Resolved" ? "white" : "red" }}>
              <td>{index + 1}</td>
              <td>{ticket.email}</td>
              <td>{ticket.description}</td>
              <td>
                <span className={`badge ${ticket.status === "Submitted" ? "bg-danger" : "bg-success"}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.adminNote || "No Notes Yet"}</td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => setViewTicketModal(ticket)}>
                  View
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleStatusChange(ticket.ticketId, "Resolved")}>
                  Mark as Resolved
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Ticket Modal */}
      {viewTicket && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ticket Details</h5>
                <button type="button" className="btn-close" onClick={() => setViewTicketModal(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Ticket ID:</strong> {viewTicket.ticketId}</p>
                <p><strong>Email:</strong> {viewTicket.email}</p>
                <p><strong>Description:</strong> {viewTicket.description}</p>
                <p><strong>Status:</strong> {viewTicket.status}</p>
                <p><strong>Admin Notes:</strong> {viewTicket.adminNote || "No notes available"}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setViewTicketModal(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

