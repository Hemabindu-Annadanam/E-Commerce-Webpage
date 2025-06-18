import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import "./Header.css"
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

const Header = React.memo(function Header() {
  const cartCount = useSelector((state:any) => state.cart.items.length);

  return (
  <Navbar  expand="lg" className="custom-navbar fixed-top shadow-sm">
    <Container fluid>
      <Navbar.Brand as={Link} to="/E-Commerce-Webpage/" className="d-flex align-items-center gap-2 nav-brand">
        <img src='https://www.seekpng.com/png/small/134-1344280_add-items-to-cart-minimalist-shopping-cart.png'
          alt="img not found"
          style={{ height: '40px', width: 'auto' }}
          className='img-style'
        />
         <span className="fw-bold fs-5 text-dark">Click Kart</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto my-2 my-lg-0 align-items-center text-center text-lg-start scroll-nav"  style={{ maxHeight: '100px' }}
            navbarScroll>
          <Nav.Link as={Link} to="/E-Commerce-Webpage/" className="text-dark fw-bold">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/E-Commerce-Webpage/products" className="text-dark fw-bold">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/E-Commerce-Webpage/cart" className="text-dark position-relative">
            <FaShoppingCart size={20} />
            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </Badge>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
});

export default Header;

