import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import ScrollReveal from "scrollreveal"; // Import ScrollReveal
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const OrgList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true); // State for loading spinner

  // Fetch organization records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.orgData);
        setLoading(false); // Stop loading after data is fetched
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading in case of error
    }
  };

  useEffect(() => {
    getDonars();

    // Initialize AOS animation
    AOS.init({
      duration: 1000, // Set the duration for animations
      easing: "ease-in-out", // Set easing for animations
      once: true, // Run animation only once when it scrolls into view
    });

    // Initialize ScrollReveal animation (if still needed)
    ScrollReveal().reveal(".table, .card", {
      distance: "50px",
      duration: 1000,
      easing: "ease-in-out",
      origin: "bottom",
      delay: 200,
    });
  }, []);

  // Filter data based on search term
  const filteredData = data.filter((record) => {
    return (
      record.organisationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(record.createdAt).format("DD/MM/YYYY hh:mm A").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this organization?",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
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
          <h2 className="text-dark" data-aos="fade-up">Organization List</h2>
          <p className="text-muted" data-aos="fade-up" data-aos-delay="200">
            Below is a list of all the organizations. You can delete any organization by clicking the "Delete" button.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            data-aos="fade-up"
            data-aos-delay="300"
          />
        </div>

        {/* Show Spinner while loading */}
        {loading ? (
          <div className="text-center" data-aos="fade-up" data-aos-delay="400">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle table" id="orgTable" data-aos="fade-up">
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
                    <tr key={record._id}>
                      <td>{record.organisationName}</td>
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
                      No organizations found
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

export default OrgList;
