import React from 'react';
import './Footer.css';

const Footer = React.memo(function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">&copy; 2025 Click Kart. All rights reserved.</p>
    </footer>
  );
});

export default Footer;