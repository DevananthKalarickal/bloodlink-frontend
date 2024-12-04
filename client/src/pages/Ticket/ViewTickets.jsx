import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../../services/API";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [adminNote, setAdminNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tickets from backend API
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await API.get("/Ticket/tickets/all");
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        alert("Failed to load tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Handle status change and admin note update
// Handle status change and admin note update
const handleStatusChange = async (id, reqBody) => {
  try {
      const { data } = await API.put(`/Ticket/tickets/${id}`, reqBody);
      // Update ticket status and admin note in the list after successful API call
      setTickets((prevTickets) => 
          prevTickets.map(ticket => 
              ticket._id === id ? { ...ticket, ...data } : ticket
          )
      );
  } catch (err) {
      console.error("Error updating ticket:", err);
  }
};
  // Handle selecting a ticket to edit
  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket); // Set the entire ticket object, not just the id
    setNewStatus(ticket.status);
    setAdminNote(ticket.adminNote || "");
  };

  // Handle saving changes to the ticket
  const handleSaveChanges = async () => {
    if (selectedTicket) {
      const updatedTicket = {
        status: newStatus,
        adminNote,
      };
      // Pass selectedTicket._id to the handleStatusChange
      await handleStatusChange(selectedTicket._id, updatedTicket); // Use the ObjectId (_id) to update
      setSelectedTicket(null); // Reset selected ticket after saving
    }
  };

  // Filter, sort, and search tickets
  const filteredTickets = tickets
    .filter((ticket) =>
      ["Submitted", "Resolved", "In Progress"].includes(ticket.status)
    )
    .sort((a, b) => {
      const statusOrder = { "In Progress": 1, Submitted: 2, Resolved: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    })
    .filter(
      (ticket) =>
        ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 10);

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <header
        className="text-center p-4 rounded shadow"
        style={{
          background: "linear-gradient(90deg, #ff5733, #c70039)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Ticket Management</h1>
        <p className="lead">Effortlessly manage and track your tickets</p>
      </header>

      {/* Search Box */}
      <div className="mt-4 mb-3 d-flex">
        <div className="input-group w-100">
          <span className="input-group-text bg-danger text-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search tickets by email, description, or status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="mb-5">
        {loading ? (
          <div>Loading tickets...</div>
        ) : (
          <table className="table table-bordered">
            <thead className="table-danger">
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
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(ticket)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Ticket Modal */}
      {selectedTicket && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Edit Ticket (ID: {selectedTicket._id}) {/* Displaying ObjectId */}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedTicket(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Admin Note</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedTicket(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;
