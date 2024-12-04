import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import Layout from '../../components/shared/Layout/Layout';
import 'chart.js/auto';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({ bloodType: '', quantity: '' });
  const [updateForm, setUpdateForm] = useState({ bloodType: '', quantity: '' });
  const BASE_URL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    AOS.init({ duration: 1200 });
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/inventory`);
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/inventory`, form);
      alert('Blood type added successfully!');
      setForm({ bloodType: '', quantity: '' });
      const updatedInventory = await axios.get(`${BASE_URL}/inventory`);
      setInventory(updatedInventory.data);
    } catch (error) {
      alert('Error adding blood type');
      console.error(error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingBloodType = inventory.find((item) => item.bloodType === updateForm.bloodType);
      if (!existingBloodType) {
        alert('Blood type not found!');
        return;
      }
      const updatedQuantity = Math.max(0, existingBloodType.quantity + Number(updateForm.quantity));
      await axios.put(`${BASE_URL}/inventory/${updateForm.bloodType}`, { quantity: updatedQuantity });
      alert('Blood quantity updated successfully!');
      setUpdateForm({ bloodType: '', quantity: '' });
      const updatedInventory = await axios.get(`${BASE_URL}/inventory`);
      setInventory(updatedInventory.data);
    } catch (error) {
      alert('Error updating blood quantity');
      console.error(error);
    }
  };

  const totalBlood = inventory.reduce((acc, item) => acc + Number(item.quantity), 0);

  const chartData = {
    labels: inventory.map((item) => item.bloodType),
    datasets: [
      {
        label: 'Blood Quantity',
        data: inventory.map((item) => item.quantity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4'],
        borderWidth: 1,
      },
    ],
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#FF6384',
      'A-': '#36A2EB',
      'B+': '#FFCE56',
      'B-': '#4CAF50',
      'AB+': '#FF9800',
      'AB-': '#9C27B0',
      'O+': '#00BCD4',
      'O-': '#607D8B',
    };
    return { backgroundColor: colors[bloodGroup] || '#CCCCCC', color: '#fff' };
  };

  // Media queries
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Layout>
      <Container fluid>
        <div className="container-fluid">
          <div className="gradient-header text-center text-red rounded" data-aos="fade-down">
            <h1>Blood Donation Inventory</h1>
            <p className="mt-3">
              Manage and monitor the blood stock in your bank with ease and accuracy.
            </p>
          </div>

          <div className="text-center mb-4" data-aos="zoom-in">
            <h4 className="text-secondary">
              Total Blood in Bank: <span className="text-primary">{totalBlood} Units</span>
            </h4>
          </div>

          {/* Add Blood Type Form */}
      

{/* Add Blood Form in a Card */}
<Card className="mb-4 shadow-lg rounded-3">
  <Card.Body>
    <Form
      onSubmit={handleAddSubmit}
      className="p-4 bg-light rounded-3 shadow-sm"
      data-aos="fade-up"
    >
      <Row className={`g-3 align-items-center ${isSmallScreen ? 'flex-column' : ''}`}>
        <Col  xs={12} sm={6} md={5}>
          <Form.Select
            value={form.bloodType}
            onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
            required
            className="form-control-lg"
          >
            <option value="" disabled>
              Select Blood Type
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Form.Select>
        </Col>
        <Col  xs={12} sm={6} md={5}>
          <Form.Control
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
            className="form-control-lg"
          />
        </Col>
        <Col xs={12} sm={12} md={2}>
          <Button variant="success" type="submit" className="w-100 py-2 fs-5">
            Add Blood
          </Button>
        </Col>
      </Row>
    </Form>
  </Card.Body>
</Card>

{/* Update Blood Quantity Form in a Card */}
<Card className="mb-4 shadow-lg rounded-3">
  <Card.Body>
    <Form
      onSubmit={handleUpdateSubmit}
      className="p-4 bg-light rounded-3 shadow-sm"
      data-aos="fade-left"
    >
      <Row className={`g-3 align-items-center ${isSmallScreen ? 'flex-column' : ''}`}>
        {/* Blood Type Select */}
        <Col xs={12} sm={6} md={5}>
          <Form.Select
            value={updateForm.bloodType}
            onChange={(e) => setUpdateForm({ ...updateForm, bloodType: e.target.value })}
            required
            className="form-control-lg"
          >
            <option value="" disabled>
              Select Blood Type
            </option>
            {inventory.map((item) => (
              <option key={item._id} value={item.bloodType}>
                {item.bloodType}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Quantity Input */}
        <Col xs={12} sm={6} md={5}>
          <Form.Control
            type="number"
            placeholder="Quantity (+ or -)"
            value={updateForm.quantity}
            onChange={(e) => setUpdateForm({ ...updateForm, quantity: e.target.value })}
            required
            className="form-control-lg"
          />
        </Col>

        {/* Update Button */}
        <Col xs={12} sm={12} md={2}>
          <Button variant="warning" type="submit" className="w-100 py-2 fs-5">
            Update Blood
          </Button>
        </Col>
      </Row>
    </Form>
  </Card.Body>
</Card>



          {/* Inventory Cards */}
          <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
            {inventory.map((record) => (
              <Col key={record._id}>
                <Card className="shadow-lg border-0" data-aos="flip-left">
                  <Card.Header style={getBloodGroupColor(record.bloodType)} className="text-center">
                    <h5 className="m-0">{record.bloodType}</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-muted">Total Donations</div>
                        <div className="d-flex align-items-center">
                          <FaArrowUp className="text-success me-2" />
                          <span>{record.quantity} Units</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-muted">Available</div>
                        <strong>{record.quantity} Units</strong>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Chart */}
          <div className="text-center mt-5">
            <h4 className="text-secondary">Blood Type Distribution</h4>
            <Chart type="bar" data={chartData} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default App;
