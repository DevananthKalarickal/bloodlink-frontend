import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import API from "../../services/API";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "../../components/shared/Layout/Layout";
  // Add custom CSS file for styling

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState({
    bloodGroup: "",
    quantity: "",
    email: "",
    status: "",
  });

  // Fetch inventory records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Click
  const handleEdit = (record) => {
    setEditingRecord(record);
    setForm({
      bloodGroup: record.bloodGroup,
      quantity: record.quantity,
      email: record.email,
      status: record.status,
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Save Changes
  const handleSave = async () => {
    try {
      const { data: response } = await API.put(`/inventory/update/${editingRecord._id}`, form);
      if (response?.success) {
        getDonars(); // Refresh data
        setEditingRecord(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/inventory/${id}`);
      console.log(response.data);
      getDonars(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting record:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    AOS.init();
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mt-4" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-center mb-4" data-aos="fade-down" data-aos-duration="1000">
          Donation History
        </h2>
        <p className="text-center mb-4 text-secondary" data-aos="fade-right" data-aos-duration="1000">
          Here you can view the history of blood donation requests and supplies made by your hospital. Stay updated on all the donation activities.
        </p>

        <div className="table-responsive">
          {loading ? (
            <div className="text-center mt-4" data-aos="zoom-in">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table table-hover table-striped align-middle modern-table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Donors</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id} data-aos="fade-up">
                    <td><span className="badge bg-primary">{record.bloodGroup}</span></td>
                    <td>
                      <span className={`badge d-inline-block ${record.inventoryType === "in" ? "bg-success" : "bg-danger"}`}>
                        {record.inventoryType === "in" ? "Donated" : "Requested"}
                      </span>
                    </td>
                    <td>{record.quantity}</td>
                    <td>{record.email}</td>
                    <td>{record.status}</td>
                    <td>{record.donorEmail}</td>
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(record)}>Edit</button>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {editingRecord && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Record</h5>
                <button type="button" className="btn-close" onClick={() => setEditingRecord(null)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Blood Group</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
  <label htmlFor="status" className="form-label">Status</label>
  <select
    name="status"
    value={form.status}
    onChange={handleChange}
    className="form-control"
   
  >
    <option value="">Select Status</option>
    <option value="urgent">Urgent</option>
    <option value="normal">Normal</option>
    <option value="resolved">Resolved</option>
    <option value="fulfilled">fulfilled</option>
  </select>
</div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingRecord(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Consumer;
