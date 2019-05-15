import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ name, description, image, category, toggle, setActiveProduct }) => (
  <Card className="product-card">
    <Card.Title className="product-card-title">{name}</Card.Title>
    <div className="flex-grow-0 flex-shrink-0">
      <img alt="product" src="http://localhost:56829/static/images/MyImage.jpg" className="product-card-image" />
    </div>
    <Card.Footer className="product-card-footer d-flex justify-content-end">
      <span
        onClick={() => {
          toggle();
          setActiveProduct({ name, description, image, category });
        }}
      >
        Więcej
      </span>
    </Card.Footer>
  </Card>
);

ProductCard.propTypes = {};

export default ProductCard;
