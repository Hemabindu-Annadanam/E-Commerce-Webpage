import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import ProductGrid from './components/ProductGrid';
import CartTray from './components/CartTray';
import Checkout from './components/CheckOut';
// import ProductGrid from './components/ProductGrid';
// import CartTray from './components/CartTray';
// import Checkout from './components/CheckOut';
const RouterComp = () => (
  <Routes>
    <Route path="/E-Commerce-Webpage/" element={<Home/>}/>
    <Route path="/" element={<Navigate to="/E-Commerce-Webpage/" replace />} />
    <Route path="E-Commerce-Webpage/products" element={<ProductGrid/>}/>
     <Route path="E-Commerce-Webpage/cart" element={<CartTray/>}/>
     <Route path='E-Commerce-Webpage/checkout' element={<Checkout/>}/>
  </Routes>
);

export default RouterComp;
