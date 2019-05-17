import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { getProducts, createProduct, deleteProductById, editProductById } from '../../api/products';
import CreateProductForm from './CreateProductForm';
import ProductCard from './ProductCard';
import FloatingButton from '../common/FloatingButton';
import useCustomModal from '../../hooks/useCustomModal';
import productDefault from '../../assets/product_default.png';
import { staticImages } from '../../api/consts';

const ProductList = props => {
  const categories = [{ id: 1, name: 'Owoce' }, { id: 2, name: 'Warzywa' }, { id: 3, name: 'Nabiał' }];
  const [isUpdated, setIsUpdated] = useState(true);
  const [activeProduct, setActiveProduct] = useState({});
  const [products, setProducts] = useState([]);

  const detailsProductModal = useCustomModal();
  const [DetailsProductModal, detailsProductModalActions] = detailsProductModal;

  const editProductModal = useCustomModal();
  const [EditProductModal, editProductModalActions] = editProductModal;

  const createProductModal = useCustomModal();
  const [CreateProductModal, createProductModalActtions] = createProductModal;

  const deleteById = async id => {
    const result = await deleteProductById(id);
    setIsUpdated(true);
  };
  const fetchData = async () => {
    const products = await getProducts();
    setProducts(products);
  };
  const editProduct = async (name, description, image, category) => {
    const product = await editProductById(name, description, image, category, activeProduct.id);
    setIsUpdated(true);
  };
  const addNewProduct = async (name, description, image, category) => {
    await createProduct(name, description, image);
    setProducts(() => [...products, { name, description, image, category }]);
    setIsUpdated(true);
  };
  useEffect(() => {
    if (isUpdated) {
      fetchData();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  return (
    <>
      <Row>
        {products &&
          products.map(product => (
            <Col sm={3} className="my-3" key={product.name}>
              <ProductCard {...product} toggle={detailsProductModalActions.openModal} setActiveProduct={setActiveProduct} />
            </Col>
          ))}
      </Row>
      <FloatingButton action={createProductModalActtions.openModal} name="Add new Product!" />

      <CreateProductModal>
        <CreateProductForm
          modalTitle="Create Product"
          categories={categories}
          closeModal={createProductModalActtions.closeModal}
          buttonTitle="Create"
          buttonAction={addNewProduct}
        />
      </CreateProductModal>

      <EditProductModal>
        <CreateProductForm
          modalTitle="Edit Product"
          categories={categories}
          closeModal={editProductModalActions.closeModal}
          buttonTitle="Zapisz"
          buttonAction={editProduct}
          initalName={activeProduct.name}
          initialDescription={activeProduct.description}
          initialCategory={activeProduct.category}
          initialImage={activeProduct.imagePath}
        />
      </EditProductModal>

      <DetailsProductModal>
        <Row>
          <Col className="text-center font-huge text-uppercase p-2">{activeProduct.name}</Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center p-2">
            <img
              src={activeProduct.imagePath ? `${staticImages}/${activeProduct.imagePath}` : productDefault}
              alt="product"
              className="product-modal-image"
            />
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
                detailsProductModalActions.closeModal();
              }}
            >
              <FaTrashAlt size={30} color="white" />
            </a>
            <a
              className="btn btn-light m-1"
              onClick={() => {
                detailsProductModalActions.closeModal();
                editProductModalActions.openModal();
              }}
            >
              <FaEdit size={30} className="product-modal-icon" />
            </a>
          </Col>
        </Row>
      </DetailsProductModal>
    </>
  );
};

ProductList.propTypes = {};

export default ProductList;
