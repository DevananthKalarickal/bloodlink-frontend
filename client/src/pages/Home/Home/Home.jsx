// import PropTypes from 'prop-types';

import Banner from "../Banner/Banner";
import About from "../AboutUs/About";

import Featured from "../Featured/Featured";
import Stats from "../Stats/Stats";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Blog from "../../Blog/Blog";
import Eligibility from "../../Blog/Eligibility";
import BloodDonation from "../../Blog/BloodDonation";
import Chatbot from "../../Dashboard/ChatBot";
import React from 'react';




const Home = () => {
    return (
        <div className="mx-auto overflow-x-hidden">
          <Navbar/>
          <Banner/> 
          <Chatbot/>
          <BloodDonation/> 
          <Featured/>
        
          <Stats/>
          
          <Blog/>
          <Eligibility/>
          <About/>
          <Footer/>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;