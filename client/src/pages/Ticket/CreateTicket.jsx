import React, { useState } from "react";

const App = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticketId: "34567890", // Custom Ticket ID
      email: "user1@example.com",
      description: "Issue with logging in",
      status: "Submitted",
      adminNote: "",
      createdTime: "2024-11-28 14:30",
    },
    {
      id: 2,
      ticketId: "34567891", // Custom Ticket ID
      email: "user2@example.com",
      description: "Error on payment page",
      status: "In Progress",
      adminNote: "Investigating issue",
      createdTime: "2024-11-28 15:45",
    },
    {
      id: 3,
      ticketId: "34567892", // Custom Ticket ID
      email: "user3@example.com",
      description: "Feature request for dark mode",
      status: "Resolved",
      adminNote: "Added to the backlog",
      createdTime: "2024-11-29 10:00",
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    email: "",
    description: "",
  });

  const [viewTicket, setViewTicketModal] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleDelete = (id) => {
    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
  };

  const handleTicketSubmit = () => {
    const newTicketId = tickets.length + 1;
    const newTicketUniqueId = Math.floor(Math.random() * 100000000); // Generate unique ticketId
    setTickets([
      ...tickets,
      {
        ...newTicket,
        id: newTicketId,
        ticketId: newTicketUniqueId.toString(), // Assign unique ticketId
        status: "Submitted", // Automatically set to Submitted
        adminNote: "Not Resolved", // Add "Not Resolved" as the default admin note
        createdTime: new Date().toLocaleString(),
      },
    ]);
    setNewTicket({ email: "", description: "" });
  };

  const handleInputChange = (e) => {
    setNewTicket({
      ...newTicket,
      [e.target.name]: e.target.value,
    });
  };

  // Filter and sort tickets to only show Submitted and Resolved tickets
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
            <tr key={ticket.id} style={{ backgroundColor: ticket.status === "Resolved" ? "white" : "red" }}>
              <td>{index + 1}</td>
              <td>{ticket.email}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.adminNote || "No Notes Yet"}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => setViewTicketModal(ticket)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Delete
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
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewTicketModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Ticket ID:</strong> {viewTicket.ticketId}
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
                  <strong>Admin Note:</strong> {viewTicket.adminNote || "No Notes Yet"}
                </p>
                <p>
                  <strong>Created Time:</strong> {viewTicket.createdTime}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewTicketModal(null)}
                >
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
