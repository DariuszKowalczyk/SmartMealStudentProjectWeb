import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { staticImages } from '../../api/consts';
import productDefault from '../../assets/product_default.png';

const ProductCard = ({ name, description, imagePath, category, toggle, id, setActiveProduct }) => (
  <Card className="product-card">
    <Card.Title className="product-card-title">{name}</Card.Title>
    <div className="flex-grow-0 flex-shrink-0">
      <img alt="product" src={imagePath ? `${staticImages}/${imagePath}` : productDefault} className="product-card-image" />
    </div>
    <Card.Footer className="product-card-footer d-flex justify-content-end">
      <span
        onClick={() => {
          toggle();
          setActiveProduct({ name, description, imagePath, category, id });
        }}
      >
        Więcej
      </span>
    </Card.Footer>
  </Card>
);

ProductCard.propTypes = {};

export default ProductCard;
