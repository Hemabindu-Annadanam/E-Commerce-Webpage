import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import ProductGrid from './components/ProductGrid';
import CartTray from './components/CartTray';
import Checkout from './components/CheckOut';
const RouterComp = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<ProductGrid />} />
    <Route path="/cart" element={<CartTray />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>

);

export default RouterComp;
