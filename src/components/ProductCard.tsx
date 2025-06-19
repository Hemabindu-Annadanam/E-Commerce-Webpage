import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import ErrorBoundary from './ErrorBoundary';

const ProductCard = React.memo(function ProductCard({ product }:any) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (!product || !product.id) {
      toast.error('Invalid product. Please try again.');
      return;
    }
    if (typeof product.price !== 'number' || product.price <= 0) {
      toast.error('Product price is invalid.');
      return;
    }
    dispatch(addToCart(product));
    toast.success('Product added to cart!');
  };
  return (
    <ErrorBoundary>
      <Card className="h-100">
        <Card.Img variant="top" src={product.image} className="custom-img"/>
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title className="card-title">{product.title}</Card.Title>
          <Card.Text className='card-tit'>${product.price}</Card.Text>
          <Button onClick={handleAddToCart} className="card-btn">
            <b className='text-dark'>Add to Cart</b>
          </Button>
        </Card.Body>
      </Card>
    </ErrorBoundary>
  ); 
});

export default ProductCard;

