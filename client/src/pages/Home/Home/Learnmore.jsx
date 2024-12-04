import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Navbarr from "../Navbar/Navbarr.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Learnmore = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing effect
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Wrapper div with full viewport height */}
      <Navbarr />

      {/* Main Content */}
      <div className="flex-grow-1 px-4 py-5 mt-4">
        {/* Card Section */}
        <Row className="g-4 mb-5 mt-5">
          <Col xs={12} md={6} lg={4} data-aos="fade-up">
            <Card className="shadow-lg border-0 h-100 d-flex flex-column rounded-4 modern-card">
              <div className="overflow-hidden rounded-top-4">
                <Card.Img
                  variant="top"
                  src="https://www.edgewoodhealthcare.com/wp-content/uploads/2020/01/donate-blood.jpg"
                  className="img-fluid"
                  style={{ height: '250px', objectFit: 'cover', filter: 'brightness(90%)' }}
                  alt="Become a Blood Donor"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-danger fw-bold fs-4 modern-title">Become a Blood Donor</Card.Title>
                <Card.Text className="text-muted flex-grow-1 fs-5 modern-text">
                  Join the life-saving cause and help those in need by donating blood. Your donation can save lives, providing a lifeline to patients undergoing critical surgeries or facing life-threatening conditions. Blood donors are everyday heroes who make a profound impact on their communities by giving the gift of life. Each pint of blood donated can save up to three lives, making your contribution invaluable. By becoming a blood donor, you join a global network of compassionate individuals committed to making a difference. Together, we can ensure that blood is always available for those in need, offering hope and recovery to countless individuals. Moreover, regular blood donations help build a steady supply of blood, ensuring hospitals can respond quickly to emergencies and avoid shortages during crises.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Repeat for other Cards with AOS effects */}
          <Col xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay="200">
            <Card className="shadow-lg border-0 h-100 d-flex flex-column rounded-4 modern-card">
              <div className="overflow-hidden rounded-top-4">
                <Card.Img
                  variant="top"
                  src="https://media.istockphoto.com/id/1415405974/photo/blood-donor-at-donation-with-bouncy-ball-holding-in-hand.jpg?s=612x612&w=0&k=20&c=j0nkmkJxIP6U6TsI3yTq8iuc0Ufhq6xoW4FSMlKaG6A="
                  className="img-fluid"
                  style={{ height: '250px', objectFit: 'cover', filter: 'brightness(90%)' }}
                  alt="Why Donate Blood?"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-danger fw-bold fs-4 modern-title">Why Donate Blood?</Card.Title>
                <Card.Text className="text-muted flex-grow-1 fs-5 modern-text">
                  Blood donations are essential for treating patients in emergencies, surgeries, and chronic conditions. In critical situations, such as accidents or natural disasters, the need for blood can surge, and every donation helps save lives. Blood is also crucial for patients undergoing major surgeries, cancer treatments, and those with medical conditions like anemia or hemophilia. Donated blood is often the difference between life and death for individuals in need, especially those in urgent need of transfusions. Regular donations ensure a steady supply, providing hospitals with the resources they need to treat patients and save lives every day. Your donation can directly impact the recovery and survival of those battling life-threatening health issues. Additionally, blood donation fosters a sense of community and brings people together in a cause that transcends personal boundaries, reminding us of the importance of solidarity in difficult times.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay="400">
            <Card className="shadow-lg border-0 h-100 d-flex flex-column rounded-4 modern-card">
              <div className="overflow-hidden rounded-top-4">
                <Card.Img
                  variant="top"
                  src="https://www.osfhealthcare.org/blog/wp-content/uploads/2021/12/shutterstock_1586903512-1.jpg"
                  className="img-fluid"
                  style={{ height: '250px', objectFit: 'cover', filter: 'brightness(90%)' }}
                  alt="How Blood Donation Helps?"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-danger fw-bold fs-4 modern-title">How Blood Donation Helps?</Card.Title>
                <Card.Text className="text-muted flex-grow-1 fs-5 modern-text">
                  Your donation directly helps patients in need, providing them with the critical blood they require to survive and recover. By donating blood, you are offering a lifeline to individuals facing serious medical conditions, such as trauma, cancer, or blood disorders. Each donation contributes to maintaining a steady supply of blood, ensuring that hospitals can respond swiftly to emergencies and planned surgeries. For patients with chronic conditions, regular blood transfusions are often a matter of life and death, and your generosity can make a world of difference. Blood donations have the power to restore health, improve quality of life, and even save lives, making every donation a vital act of compassion. Furthermore, the act of donating blood brings a sense of fulfillment and personal connection to those in need, reinforcing the idea that a small gesture can create a ripple effect of positive change in the world.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Hero Section */}
        <div className="hero mb-5">
          <Row className="align-items-center">
            <Col xs={12} lg={5} className="mb-4 mb-lg-0" data-aos="fade-left">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://t4.ftcdn.net/jpg/10/59/51/69/360_F_1059516962_BCfDziuoY2F9LO4jnoNgtw1pGjnL0VxV.jpg"
                  className="img-fluid shadow-lg"
                  alt="Blood Types"
                  style={{ height: '350px', objectFit: 'cover', borderRadius: '15px' }}
                />
              </div>
            </Col>
            <Col xs={12} lg={7} data-aos="fade-right">
              <h2 className="text-danger border-bottom pb-3 fw-bold fs-2">Who Are Blood Donors?</h2>
              <p className="py-4 fs-5 modern-text">
                Blood donors are individuals who donate blood voluntarily to help others in need. They play a crucial role in saving lives. Donors come from all walks of life and are united by the desire to make a difference. They are motivated by the need to help those who may not have the resources or support to survive without blood donations. Donating blood is a simple yet powerful way of showing kindness and compassion toward strangers. The act of giving blood is a selfless contribution that can have an immense impact on someone's life, making blood donors true heroes in the eyes of many.
              </p>
              <ul className="pb-4 list-unstyled">
                <li className="text-muted fs-5 mb-2">→ Help save lives in emergencies, such as accidents, natural disasters, or unexpected medical crises.</li>
                <li className="text-muted fs-5 mb-2">→ Support patients undergoing surgery, ensuring they have the necessary blood supply for a successful recovery.</li>
                <li className="text-muted fs-5 mb-2">→ Provide assistance for those with chronic blood conditions, such as sickle cell anemia or thalassemia, who need regular transfusions.</li>
                <li className="text-muted fs-5 mb-2">→ Aid cancer patients who often require blood during treatments like chemotherapy, which can weaken the body's blood count.</li>
                <li className="text-muted fs-5 mb-2">→ Ensure that blood banks are stocked and ready for unexpected medical procedures, maintaining a continuous supply for those in need.</li>
                <li className="text-muted fs-5 mb-2">→ Help newborns and premature babies who may need blood transfusions due to underdeveloped blood systems or health complications at birth.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Learnmore;
