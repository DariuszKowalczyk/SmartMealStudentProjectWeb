import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { rawUrl,staticImages } from '../../helpers/consts';
import productDefault from '../../assets/product_default.png';

const ProductDetails = ({ activeProduct, closeModal, openModal, deleteById }) => (
  <>
    <Row>
      <Col className="text-center font-huge text-uppercase p-2">{activeProduct.name}</Col>
    </Row>
    <Row>
      <Col className="d-flex justify-content-center p-2">
        <img src={activeProduct.imagePath ? `${staticImages}${activeProduct.imagePath}` : productDefault} alt="product" className="product-modal-image" />
      </Col>
    </Row>
    <Row>
      <Col className="text-center p-2">{activeProduct.category}</Col>
    </Row>
    <Row>
      <Col className="text-center p-2">{activeProduct.description}</Col>
    </Row>
    <Row>
      <Col className="d-flex justify-content-center">
        <a
          className="btn btn-danger m-1"
          onClick={() => {
            deleteById(activeProduct.id);
            closeModal();
          }}
        >
          <FaTrashAlt size={30} color="white" />
        </a>
        <a
          className="btn btn-light m-1"
          onClick={() => {
            closeModal();
            openModal();
          }}
        >
          <FaEdit size={30} />
        </a>
      </Col>
    </Row>
  </>
);

export default ProductDetails;
