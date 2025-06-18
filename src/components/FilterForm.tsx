import { useEffect, useRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './FilterForm.css'
const FilterForm = ({
  searchTerm,
  onSearchChange,
  searchError,
  searchInputRef,
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onClearFilters,
}:any) => {
  const inputRef = searchInputRef || useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className='pt-1'>
      <div className="center-search">
        <Form.Group controlId='search' className='form-field' style={{width:'30%'}}>
          <Form.Control
            type='text'
            placeholder='Search by product name...'
            value={searchTerm}
            onChange={onSearchChange}
            ref={inputRef}
            className='mb-4 control-field'
            isInvalid={!!searchError}
          />
          <Form.Control.Feedback type='invalid'>{searchError}</Form.Control.Feedback>
        </Form.Group>
      </div>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="category">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='control-field'
            >
              <option value="">All Categories</option>
              {categories.map((cat :any, index:any) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="price">
            <Form.Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className='control-field'
            >
              <option value="">All Prices</option>
              <option value="under25">Under $25</option>
              <option value="25to50">$25 to $50</option>
              <option value="above50">Above $50</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="rating">
            <Form.Select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className='control-field'
            >
              <option value="">All Ratings</option>
              <option value="1">1 ⭐ & up</option>
              <option value="2">2 ⭐ & up</option>
              <option value="3">3 ⭐ & up</option>
              <option value="4">4 ⭐ & up</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button onClick={onClearFilters} className="clear-outline-btn text-dark">
            Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterForm;