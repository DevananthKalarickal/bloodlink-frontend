import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS for animations

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [adminNote, setAdminNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);

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

    // Initialize AOS animations
    AOS.init({ duration: 500 });
  }, []);

  const handleStatusChange = async (id, reqBody) => {
    try {
      const { data } = await API.put(`/Ticket/tickets/${id}`, reqBody);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, ...data } : ticket
        )
      );
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setAdminNote(ticket.adminNote || "");
  };

  const handleSaveChanges = async () => {
    if (selectedTicket) {
      const updatedTicket = {
        status: newStatus,
        adminNote,
      };
      // Save the changes first
      await handleStatusChange(selectedTicket._id, updatedTicket);

      // Re-fetch the tickets to get the updated list
      const response = await API.get("/Ticket/tickets/all");
      setTickets(response.data.tickets); // Update state with the new ticket data

      // Reset selected ticket after saving
      setSelectedTicket(null);
    }
  };

  const filteredTickets = useMemo(() => {
    return tickets
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
  }, [tickets, searchQuery]);

  return (
    <Layout>
      <div
        className="container mt-4"
        style={{
          animation: "fadeIn 1s ease-in-out",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Header Section */}
        <header className="text-center p-4 rounded" style={{ marginBottom: "20px" }}>
          <h1 className="display-4" style={{ fontWeight: "bold" }}>
            Ticket Management
          </h1>
          <p className="lead" style={{ fontSize: "1.2rem" }}>
            Effortlessly manage and track your tickets
          </p>
        </header>

        {/* Search Box */}
        <div className="mb-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="input-group">
               
                
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search tickets by email, description, or status"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: "none",
                    borderRadius: "0 15px 15px 0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="mb-5">
          {loading ? (
            <div>Loading tickets...</div>
          ) : (
            <div className="table-responsive"  style={{ display: "block", animation: "fadeIn 0.5s ease-in-out" }}>
              <table
                className="table table-striped table-hover shadow-sm"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <thead style={{ backgroundColor: "#ff3333", color: "white" }}>
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
                      <td>
                        <span
                          className={`badge bg-${
                            ticket.status === "Resolved"
                              ? "success"
                              : ticket.status === "In Progress"
                              ? "warning"
                              : "danger"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditClick(ticket)}
                          style={{
                            background: "#ff3333",
                            border: "none",
                          }}
                        >
                          <FaEdit /> view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Ticket Modal */}
        {selectedTicket && (
          <div
            className="modal fade show"
            style={{ display: "block", animation: "fadeIn 0.5s ease-in-out" }}
            tabIndex="-1"
            data-aos="zoom-in"
          >
            <div className="modal-dialog modal-lg">
              <div
                className="modal-content"
                style={{
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="modal-header"
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "15px 15px 0 0",
                  }}
                >
                  <h5 className="modal-title">
                    Edit Ticket (ID: {selectedTicket._id})
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
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="modal-footer"
                  style={{
                    background: "red",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setSelectedTicket(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TicketManagement;
