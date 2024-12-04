import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
      if (data?.success) {
        setData(data?.hospitalData);
        setFilteredData(data?.hospitalData); // Initialize filteredData with full data
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setLoading(false);
      setError("Failed to load hospital data.");
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
    AOS.init(); // Initialize AOS on component mount
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter((record) => {
      return (
        record.hospitalName?.toLowerCase().includes(term) ||
        record.email?.toLowerCase().includes(term) ||
        record.phone?.toLowerCase().includes(term) ||
        moment(record.createdAt).format("DD/MM/YYYY hh:mm A").toLowerCase().includes(term)
      );
    });

    setFilteredData(filtered);
  };

  // Delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this hospital?",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-hospital/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2 className="text-dark" data-aos="fade-up">
            Hospital List
          </h2>
          <p className="text-muted" data-aos="fade-up" data-aos-delay="200">
            Below is a list of all the registered hospitals. You can delete any hospital by clicking the "Delete" button.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="d-flex justify-content-center mb-4">
            <div className="spinner-border" role="status" data-aos="fade-up" data-aos-delay="400">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mb-4" role="alert" data-aos="fade-up" data-aos-delay="600">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-4" data-aos="fade-up" data-aos-delay="800">
          <input
            type="text"
            className="form-control"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Table */}
        {!loading && !error && (
          <div className="table-responsive" data-aos="fade-up" data-aos-delay="1000">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record) => (
                    <tr key={record._id} data-aos="fade-up" data-aos-delay="1200">
                      <td>{record.hospitalName}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(record._id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hospitals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HospitalList;
