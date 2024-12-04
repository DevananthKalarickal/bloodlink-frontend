import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { FaLocationPin } from "react-icons/fa6";
import { PlusIcon, DatabaseIcon, MailIcon, CalendarIcon } from "lucide-react";
import AOS from "aos";
import Modal from "../components/shared/modal/Modal"; // The imported Modal
import "aos/dist/aos.css"; // Import AOS CSS
import { Spinner, Button } from "react-bootstrap"; // Bootstrap Spinner

const CustomModal = ({ show, onHide, title, children }) => {
  if (!show) return null; // Do not render if not shown

  return (
    <div className="modal" style={{ display: 'block', zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
  type="button" 
  className="close" 
  onClick={onHide} 
  style={{ 
    width: '30px', 
    height: '32px', 
    fontSize: '20px', 
    padding: '0', 
    backgroundColor: 'red',  // Added red background color
    border: 'none'  // Optional: Removes the default border
  }}
>
  &times;
</button>

          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
           
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [donorEmail, setDonorEmail] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((record) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (record.bloodGroup?.toLowerCase().includes(searchTermLower) || false) ||
      (record.inventoryType?.toLowerCase().includes(searchTermLower) || false) ||
      (record.email?.toLowerCase().includes(searchTermLower) || false) ||
      (record.createdAt?.toLowerCase().includes(searchTermLower) || false) ||
      (record.location?.toLowerCase().includes(searchTermLower) || false)
    );
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNewRecord = (record) => {
    setData((prevData) => [record, ...prevData]);
  };

  const getInventoryColor = (status) => {
    switch (status.toLowerCase()) {
      case "urgent":
        return "bg-danger";
      case "resolved":
        return "bg-success";
      case "fulfilled":
        return "bg-warning";
      case "pending":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const handleAddDonorEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/inventory/update-donor/${selectedId}`, { donorEmail, recordId: selectedId });
      if (response?.data?.success) {
        alert("Donor email added successfully!");
        getBloodRecords();
        setDonorEmail("");
        setSelectedId(null);
        setShowModal(false);
      } else {
        alert(response?.data?.message || "Failed to add donor email.");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding donor email.");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
    getBloodRecords();
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleDonateClick = (recordId) => {
    console.log("Selected record ID:", recordId);
    setSelectedId(recordId);
    setShowModal(true);
  };

  return loading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        overflowX: "hidden",
      }}
    >
      <Spinner animation="border" variant="dark" />
    </div>
  ) : (
    <Layout>
      <div
        className="container-fluid"
        style={{
          maxWidth: "100%",
          overflowX: "hidden",
          margin: "0",
          padding: "0",
        }}
      >
        <div className="row">
          <div
            className="col-12 d-flex align-items-center justify-content-between py-4"
            data-aos="fade-down"
          >
            <h1>
              <DatabaseIcon className="w-10 h-10" /> Blood Inventory
            </h1>
            <button
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
              data-aos="fade-up"
               // Open modal for adding new record
            >
              <PlusIcon className="w-5 h-5" /> Add New Record
            </button>
          </div>

          <div
            className="col-12 d-flex justify-content-center m-3 mb-3"
            data-aos="fade-left"
            style={{
              padding: "10px",
            }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              placeholder="Search records..."
              style={{
                maxWidth: "1250px",
              }}
            />
          </div>

          <div className="col-12">
            <div
              className="table-container"
              data-aos="zoom-in"
              style={{
                overflow: "auto",
                maxHeight: "400px",
                scrollbarWidth: "thin",
                scrollbarColor: "#ccc transparent",
                WebkitOverflowScrolling: "touch",
                width: "100%",
                tableLayout: "auto",
              }}
            >
              <table
                className="table table-bordered"
                style={{
                  borderRadius: "10px",
                  borderCollapse: "separate",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  tableLayout: "auto",
                }}
              >
                <thead>
                  <tr>
                    <th>Blood Group</th>
                    <th>Inventory Type</th>
                    <th>Quantity (ML)</th>
                    <th>Donor Email</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record._id}>
                      <td>
                        <span className="badge badge-blood-group bg-primary">
                          {record.bloodGroup}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge d-inline-block ${record.inventoryType === "in" ? "bg-success" : "bg-danger"}`}
                          style={{
                            minWidth: "100px",
                            textAlign: "center",
                          }}
                        >
                          {record.inventoryType === "in" ? "Donated" : "Requested"}
                        </span>
                      </td>
                      <td>{record.quantity}</td>
                      <td>
                        <MailIcon /> {record.email}
                      </td>
                      <td>
                        <CalendarIcon /> {formatDate(record.createdAt)}
                      </td>
                      <td>
                        <FaLocationPin /> {record.location}
                      </td>
                      <td>
                        <span
                          className={`badge ${getInventoryColor(record.status)}`}
                          style={{ minWidth: "80px", textAlign: "center" }}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDonateClick(record._id)}
                          className="btn btn-warning"
                        >
                          Donate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        <CustomModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Add Donor Email"
        >
          <form onSubmit={handleAddDonorEmail}>
            <div className="form-group  border-danger">
              <label htmlFor="donorEmail">Donor Email</label>
              <input
                type="email"
                id="donorEmail"
                className="form-control  border-danger"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="danger" className="mt-3">
              Save Email
            </Button>
          </form>
        </CustomModal>
      </div>
        <Modal onRecordSubmit={handleNewRecord} />
    </Layout>
  );
};

export default HomePage;
