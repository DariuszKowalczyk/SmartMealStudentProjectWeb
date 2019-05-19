import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import ProductList from '../../components/products/ProductList';

const ProductContainer = props => (
  <Container>
    <div className="text-center font-huge my-2">Produkty</div>
    <ProductList />
  </Container>
);

ProductContainer.propTypes = {};

export default ProductContainer;
