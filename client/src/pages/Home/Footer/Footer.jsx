import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { LuPhoneOutgoing } from "react-icons/lu";
import { TbMailOpened } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import logo from "../../../images/logo/logo.png";
import React  from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      {/* Contact Section */}
      <div className="row g-3 px-5 justify-content-center text-center text-md-start align-items-center">
        {/* Emergency Contact */}
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <LuPhoneOutgoing className="fs-1 text-danger me-3" />
          <div>
            <p className="mb-1">Emergency Calling</p>
            <p className="fw-bold">+8801819892144</p>
          </div>
        </div>

        {/* Email Contact */}
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <TbMailOpened className="fs-1 text-danger me-3" />
          <div>
            <p className="mb-1">Email Us</p>
            <p className="fw-bold">www.admin@mail.com</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="col-12 col-md-4 text-center">
          <p>Let's Connect</p>
          <div className="d-flex justify-content-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger btn-lg rounded-circle"
              aria-label="Facebook"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger btn-lg rounded-circle"
              aria-label="Twitter"
            >
              <FaTwitter size={16}/>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger btn-lg rounded-circle"
              aria-label="Instagram"
            >
              <FaInstagram size={16}  />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="bg-gradient-dark mt-3 py-3">
        <div className="row g-3 text-center text-md-start">
          {/* Logo and Motto */}
          <div className="col-12 col-md-3 text-center">
            <img src={logo} alt="Logo" width={60} className="d-inline-block align-top mb-2" />
            <p className="text-danger fw-bold fs-4">BloodLink</p>
            <p className="text-white-50">Working for Humanity</p>
          </div>

          {/* Footer Links */}
          <div className="col-12 col-md-9">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <h5 className="text-danger">EXPLORE</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Donate Blood
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Request Blood
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-4">
                <h5 className="text-danger">CONTACT</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      +8801819892144
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      help@bloodlink.com
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      open 24/7
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-4">
                <h5 className="text-danger">Legal</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Terms of use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none hover-text-danger">
                      Cookie policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-dark text-center py-1 mt-3 border-top border-secondary">
        <p className="mb-0">
          &copy; 2024 - All rights reserved by{" "}
          <span className="text-danger">BloodLink</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
