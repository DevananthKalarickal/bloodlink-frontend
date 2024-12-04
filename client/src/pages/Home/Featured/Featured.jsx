import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Featured.css';

const Featured = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize ScrollReveal animations
    ScrollReveal().reveal('.card-container', {
      origin: 'bottom',
      distance: '50px',
      duration: 700,
      easing: 'ease-out',
      interval: 100,
    });

    ScrollReveal().reveal('.hero-section', {
      origin: 'left',
      distance: '100px',
      duration: 700,
      easing: 'ease-out',
    });
  }, []);

  const handleLearnMoreClick = () => {
    navigate('/Learnmore');
    window.scrollTo(0, 0);
  };

  return (
    <div className="featured-container px-4 py-12">
      {/* Card Section */}
      <Row className="g-4">
        {[
          {
            title: "Become a Blood Donor",
            text: "Join the life-saving cause and help those in need by donating blood. Your donation can save lives.",
            imgSrc: "https://www.edgewoodhealthcare.com/wp-content/uploads/2020/01/donate-blood.jpg",
            alt: "Become a Blood Donor"
          },
          {
            title: "Why Donate Blood?",
            text: "Blood donations are essential for treating patients in emergencies, surgeries, and chronic conditions.",
            imgSrc: "https://media.istockphoto.com/id/1415405974/photo/blood-donor-at-donation-with-bouncy-ball-holding-in-hand.jpg?s=612x612&w=0&k=20&c=j0nkmkJxIP6U6TsI3yTq8iuc0Ufhq6xoW4FSMlKaG6A=",
            alt: "Why Donate Blood?"
          },
          {
            title: "How Blood Donation Helps?",
            text: "Your donation directly helps patients in need, providing them with the critical blood they require to survive and recover.",
            imgSrc: "https://www.osfhealthcare.org/blog/wp-content/uploads/2021/12/shutterstock_1586903512-1.jpg",
            alt: "How Blood Donation Helps?"
          }
        ].map((card, index) => (
          <Col xs={12} md={6} lg={4} key={index} className="card-container">
            <Card className="modern-card shadow-sm border-0 h-100 d-flex flex-column rounded-4">
              <div className="overflow-hidden rounded-top-4">
                <Card.Img
                  variant="top"
                  src={card.imgSrc}
                  className="img-fluid"
                  style={{ height: '250px', objectFit: 'cover', filter: 'brightness(90%)' }}
                  alt={card.alt}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-danger fw-bold fs-4">{card.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1 fs-5">
                  {card.text}
                </Card.Text>
                <Button
                  variant="outline-danger"
                  className="w-100 rounded-pill shadow-sm modern-button"
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(to right, #ff416c, #ff4b2b)';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#dc3545';
                  }}
                  aria-label={`Read more about ${card.title}`}
                  onClick={handleLearnMoreClick}
                >
                  Learn more →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Hero Section */}
      <div className="hero-section pt-5">
        <Row className="align-items-center">
          <Col xs={12} lg={5} className="pr-lg-4 mb-4 mb-lg-0">
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://t4.ftcdn.net/jpg/10/59/51/69/360_F_1059516962_BCfDziuoY2F9LO4jnoNgtw1pGjnL0VxV.jpg"
                className="img-fluid shadow-lg"
                alt="Blood Types"
                style={{ height: '350px', objectFit: 'cover', borderRadius: '15px' }}
              />
            </div>
          </Col>
          <Col xs={12} lg={7}>
            <h2 className="text-danger border-bottom pb-3 fw-bold fs-2">Who Are Blood Donors?</h2>
            <p className="py-4 fs-5">
              Blood donors are individuals who donate blood voluntarily to help others in need. They play a crucial role in saving lives.
            </p>
            <ul className="pb-4">
              <li className="text-muted fs-5">→ Help save lives in emergencies</li>
              <li className="text-muted fs-5">→ Support patients undergoing surgery</li>
              <li className="text-muted fs-5">→ Provide assistance for those with chronic blood conditions</li>
            </ul>
            <Button
              variant="outline-danger"
              className="w-100 rounded-pill shadow-sm modern-button"
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #ff416c, #ff4b2b)';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#dc3545';
              }}
              aria-label="Read more about blood donors"
              onClick={handleLearnMoreClick}
            >
              Learn more →
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Featured;
