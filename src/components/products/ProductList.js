import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import CreateProductForm from './CreateProductForm';
import ProductCard from './ProductCard';
import FloatingButton from '../common/FloatingButton';
import useCustomModal from '../../hooks/useCustomModal';

const ProductList = props => {
  const categories = [{ id: 1, name: 'Owoce' }, { id: 2, name: 'Warzywa' }, { id: 3, name: 'Nabiał' }];
  const [activeProduct, setActiveProduct] = useState({});
  const [products, setProducts] = useState([
    { name: 'test', description: 'OPISOPISOPISOPISOPISOPISOPISOPISOPIS OPISOPISOPISOPISOPIS', image: '', category: '' },
    { name: 'test', description: 'OPIS', image: '', category: '' },
    { name: 'test', description: 'OPIS', image: '', category: '' },
    { name: 'test', description: 'OPIS', image: '', category: '' },
    { name: 'test', description: 'OPIS', image: '', category: '' },
  ]);
  useEffect(() => {}, [products]);
  const addNewProduct = (name, description, image, category) => {
    setProducts(() => [...products, { name, description, image, category }]);
  };
  const [Modal, { openModal, closeModal }] = useCustomModal();
  const modal = useCustomModal();
  const [CreateProductModal, createProductModalActtions] = modal;
  return (
    <>
      <Row>
        {products &&
          products.map(product => (
            <Col sm={3} className="my-3">
              <ProductCard {...product} toggle={openModal} setActiveProduct={setActiveProduct} />
            </Col>
          ))}
      </Row>
      <FloatingButton action={createProductModalActtions.openModal} />
      <CreateProductModal>
        <CreateProductForm categories={categories} closeModal={createProductModalActtions.closeModal} addNewProduct={addNewProduct} />
      </CreateProductModal>
      <Modal>
        <Row>
          <Col className="d-flex justify-content-center font-huge text-uppercase p-2">{activeProduct.name}</Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center p-2">
            <img src="http://localhost:56829/static/images/MyImage.jpg" alt="product" className="product-modal-image" />
          </Col>
        </Row>
        <Row>
          {console.log(activeProduct)}
          <Col className="text-center p-2">{activeProduct.category}</Col>
        </Row>
        <Row>
          <Col className="text-center p-2">{activeProduct.description}</Col>
        </Row>
      </Modal>
    </>
  );
};

ProductList.propTypes = {};

export default ProductList;
