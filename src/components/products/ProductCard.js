import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { rawUrl } from '../../helpers/consts';
import productDefault from '../../assets/product_default.png';

const ProductCard = ({ name, description, imagePath, id, category, setActiveProduct }) => (
  <Card className="product-card">
    <Card.Title className="product-card-title">{name}</Card.Title>
    <div className="flex-grow-0 flex-shrink-0">
      <img alt="product" src={imagePath ? `${rawUrl}${imagePath}` : productDefault} className="product-card-image" />
    </div>
    <Card.Footer className="product-card-footer d-flex justify-content-end">
      <span
        onClick={() => {
          setActiveProduct(id);
        }}
      >
        Więcej
      </span>
    </Card.Footer>
  </Card>
);

ProductCard.propTypes = {};

export default ProductCard;
