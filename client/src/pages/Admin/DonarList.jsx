import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const DonarList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(""); // State to track errors

  // Fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      setError("Failed to load donor data.");
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  useEffect(() => {
    getDonars();
    AOS.init(); // Initialize AOS on component mount
  }, []);

  // Filter data based on search term
  const filteredData = data.filter((record) => {
    return (
      record.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(record.createdAt).format("DD/MM/YYYY hh:mm A").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you sure you want to delete this donor?", "Sure");
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
        <div className="text-center mb-4" data-aos="fade-up">
          <h2 className="text-dark">Donor List</h2>
          <p className="text-muted" data-aos="fade-up" data-aos-delay="200">
            Below is a list of all the registered donors. You can delete any donor by clicking the "Delete" button.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="d-flex justify-content-center mb-4" data-aos="fade-up" data-aos-delay="400">
            <div className="spinner-border" role="status">
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
            placeholder="Search donors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
                      <td>{record.name}</td>
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
                      No donors found
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

export default DonarList;




// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { FaUserShield, FaTasks, FaHospital, FaDatabase, FaUsers, FaBuilding, FaChartLine } from "react-icons/fa";
// import { Spinner } from "react-bootstrap";
// import { motion } from "framer-motion";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Layout from "../../components/shared/Layout/Layout";

// const AdminHome = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//     setTimeout(() => setLoading(false), 2000); // Simulating loading for 2 seconds
//   }, []);

//   // Card Data
//   const cards = [
//     { icon: <FaTasks />, title: "Manage Tasks", color: "warning", text: "Efficiently manage tasks, approve requests, and oversee operations." },
//     { icon: <FaHospital />, title: "Hospital Records", color: "danger", text: "Track hospital data, blood availability, and partnerships." },
//     { icon: <FaDatabase />, title: "Data Insights", color: "info", text: "Analyze data and generate reports for better decision-making." },
//     { icon: <FaUsers />, title: "Donor Records", color: "primary", text: "Maintain donor database, track donations, and notify donors." },
//     { icon: <FaBuilding />, title: "Organization Records", color: "secondary", text: "Manage organizational collaborations and partnerships." },
//     { icon: <FaChartLine />, title: "Analytics", color: "success", text: "Visualize trends and insights for strategic decisions." },
//   ];

//   return (
//     // If loading, show spinner
//     loading ? (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
//         <Spinner animation="border" variant="primary" />
//       </div>
//     ) : (
//       // Render the Layout once loading is complete
//       <Layout>
//         <div className="container-fluid px-5 py-4" style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
//           <div className="text-center mb-5">
//             <motion.h1
//               className="display-3 mb-3 text-dark"
//               style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: '700' }}
//               data-aos="fade-up"
//               data-aos-delay="200"
//               data-aos-duration="1000"
//             >
//               <FaUserShield className="text-danger me-3" />
//               Welcome, Admin{" "}
//               <span className="text-muted">{user?.name || "User"}</span>
//             </motion.h1>
//             <motion.h3
//               className="text-dark mb-5"
//               data-aos="zoom-in"
//               data-aos-delay="500"
//               style={{ fontWeight: '400' }}
//             >
//               Manage the Blood Donation Platform
//             </motion.h3>
//             <hr />
//           </div>

//           {/* Dashboard Cards */}
//           <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 className="col"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 * index }}
//               >
//                 <div
//                   className={`card rounded-4 shadow-lg border-0 p-3 hover-zoom`}
//                   style={{
//                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))',
//                     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//                     transition: 'transform 0.3s ease',
//                   }}
//                 >
//                   <div className={`display-4 text-${card.color} mb-3`}>
//                     {card.icon}
//                   </div>
//                   <h5 className="card-title text-dark">{card.title}</h5>
//                   <p className="card-text text-muted">{card.text}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* About Section */}
//           <div className="mt-5">
//             <h4 className="text-muted">About this Dashboard</h4>
//             <p className="text-justify">
//               This admin dashboard provides all the necessary tools to manage the Blood Donation platform. From handling
//               tasks and hospital records to maintaining donor information and tracking analytics, everything is designed
//               to optimize the operations of the blood donation system. Easily monitor trends, manage operations, and
//               collaborate with organizations.
//             </p>
//           </div>
//         </div>
//       </Layout>
//     )
//   );
// };

// export default AdminHome;

