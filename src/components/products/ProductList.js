import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { getProducts, createProduct, deleteProductById, editProductById, getProductById } from '../../api/products';
import CreateProductForm from './CreateProductForm';
import ProductCard from './ProductCard';
import FloatingButton from '../common/FloatingButton';
import useCustomModal from '../../hooks/useCustomModal';
import ProductDetails from './ProductDetails';

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
    await deleteProductById(id);
    setIsUpdated(true);
  };
  const fetchData = async () => {
    const products = await getProducts();
    setProducts(products);
  };
  const editProduct = async (name, description, image, category) => {
    await editProductById(name, description, image, category, activeProduct.id);
    setIsUpdated(true);
  };
  const fetchProductById = async id => {
    const product = await getProductById(id);
    if (product) {
      setActiveProduct(product);
      detailsProductModalActions.openModal();
    }
  };
  const addNewProduct = async (name, description, image, category) => {
    await createProduct(name, description, image);
    console.log(...products, 'WAHAT');
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
              <ProductCard {...product} setActiveProduct={fetchProductById} />
            </Col>
          ))}
      </Row>
      <FloatingButton action={createProductModalActtions.openModal} name="Dodaj nowy produkt!" />

      <CreateProductModal>
        <CreateProductForm
          modalTitle="Dodaj Produkt"
          categories={categories}
          closeModal={createProductModalActtions.closeModal}
          buttonTitle="Stwórz"
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
          activeProductName={activeProduct.name}
          activeProductDescription={activeProduct.description}
          activeProductCategory={activeProduct.category}
          activeProductImagePath={activeProduct.imagePath}
        />
      </EditProductModal>

      <DetailsProductModal>
        <ProductDetails
          activeProduct={activeProduct}
          closeModal={detailsProductModalActions.closeModal}
          openModal={editProductModalActions.openModal}
          deleteById={deleteById}
        />
      </DetailsProductModal>
    </>
  );
};

ProductList.propTypes = {};

export default ProductList;
