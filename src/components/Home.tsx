import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = React.memo(() => (
  <div className="image-container">
    <img 
      src='https://t3.ftcdn.net/jpg/04/29/97/36/360_F_429973653_N258TnADxIQ0HAiDq31814hWpy9vODDb.jpg'
      alt="background"
      className="background-image"/>
    <div className="content-overlay">
      <div className="overlay-content">
        <h1>Welcome to Click Kart</h1>
        <p>Discover amazing deals and the latest products at unbeatable prices!</p>
        <p>From daily essentials to exclusive gadgets, we bring everything you need right to your fingertips.</p>
        <p>Enjoy seamless shopping, fast delivery, and top-notch customer service all in one place.</p>
        <Link to="/Webpage/products" className="show-products-button"> Show Products </Link> 
      </div>
    </div>
  </div>
));

export default Home;
