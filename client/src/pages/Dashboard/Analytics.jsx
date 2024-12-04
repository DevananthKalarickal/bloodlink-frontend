import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import { DropletIcon, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, Spinner } from "react-bootstrap";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBloodGroupData = async () => {
    try {
      setLoading(true);
      const response = await API.get("/analytics/bloodGroups-data");
      if (response.data?.success) {
        setData(response.data?.bloodGroupData);
      }
    } catch (error) {
      setError("Failed to fetch blood group data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBloodRecords = async () => {
    try {
      setLoading(true);
      const response = await API.get("/inventory/get-recent-inventory");
      if (response.data?.success) {
        setInventoryData(response.data?.inventory);
      }
    } catch (error) {
      setError("Failed to fetch recent blood transactions.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out" });
  }, []);

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': { backgroundColor: '#FF5733' },
      'B+': { backgroundColor: '#007bff' },
      'AB+': { backgroundColor: '#4CAF50' },
      'O+': { backgroundColor: '#FF9800' },
      'A-': { backgroundColor: '#212121' },
      'B-': { backgroundColor: '#03A9F4' },
      'O-': { backgroundColor: '#607D8B' },
      'AB-': { backgroundColor: '#9C27B0' },
    };
    return colors[bloodGroup] || { backgroundColor: '#6c757d' };
  };

  const formatDate = (dateString) => moment(dateString).format("DD MMM YYYY, hh:mm A");

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="analytics-container">
        <div className="container space-y-8">
          <div className="header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <DropletIcon className="h-8 w-8 text-danger" />
              <h1 className=""  style={{
    fontSize: '2rem', 
    fontWeight: '500', 
    fontFamily: 'Roboto, sans-serif', 
    color: 'black', 
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', 
    textAlign: 'center'
  }}>Blood Bank Analytics</h1>
            </div>
            <div className="d-flex align-items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-success" />
              <span className="updates-text">Live Updates</span>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {data.map((record, i) => (
              <div
                key={i}
                className="col"
                data-aos="zoom-in"
                data-aos-delay={i * 150}
              >
                <Card className="blood-card overflow-hidden shadow-lg">
                  <Card.Header
                    className="blood-header"
                    style={getBloodGroupColor(record.bloodGroup)}
                  >
                    <h5 className="m-0 text-white">{record.bloodGroup}</h5>
                  </Card.Header>
                  <Card.Body className="pt-4">
                    <div className="row">
                      <div className="col-6">
                        <div className="small text-muted">Total Donations</div>
                        <div className="d-flex align-items-center gap-1">
                          <ArrowUpIcon className="h-4 w-4 text-success" />
                          <span className="font-weight-semibold">{record.totalIn}</span>
                          <span className="small text-muted">ML</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="small text-muted">Total Requests</div>
                        <div className="d-flex align-items-center gap-1">
                          <ArrowDownIcon className="h-4 w-4 text-danger" />
                          <span className="font-weight-semibold">{record.totalOut}</span>
                          <span className="small text-muted">ML</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-top">
                      <div className="small text-muted">Available</div>
                      <div className="font-weight-bold text-dark">
                        {record.availableBlood} ML
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <Card>
            <Card.Header>
              <h5 className="m-0">Recent Blood Transactions</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Blood Group</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Contact</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((record) => (
                      <tr key={record._id} data-aos="fade-left" data-aos-delay="300">
                        <td>
                          <span
                            className={`badge text-white`}
                            style={getBloodGroupColor(record.bloodGroup)}
                          >
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <span
                            className={
                              record.inventoryType === "in"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {record.inventoryType === "in" ? "Donated" : "Requested"}
                          </span>
                        </td>
                        <td>{record.quantity} ML</td>
                        <td>{record.email}</td>
                        <td>{formatDate(record.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analytics;
