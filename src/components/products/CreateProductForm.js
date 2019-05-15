import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Row, Col, Dropdown, Button, Spinner } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import ProductDefault from '../../assets/product_default.png';
import { ErrorBox } from '../common/Notifications';

const AddMealSchema = Yup.object().shape({
  productName: Yup.string().required('Required'),
  productDescription: Yup.string()
    .required('Required')
    .min(4, 'should be 4 chars minimum.'),
});
const CreateProductForm = ({ categories, closeModal, addNewProduct }) => {
  const inputFile = useRef(null);

  const [image, setImage] = useState({ preview: ProductDefault, image: null });
  useEffect(() => {}, [image]);

  const handleImageChange = e => {
    e.preventDefault();
    setImage(URL.createObjectURL(e.target.files[0]));
    setImage({ preview: URL.createObjectURL(e.target.files[0]), image: e.target.files[0].name });
  };

  return (
    <Formik
      initialValues={{ productName: '', productDescription: '', productCategory: '' }}
      validationSchema={AddMealSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus({});
        console.log(values, 'VALUES');
        addNewProduct(values.productName, values.productDescription, image.image, values.productCategory);
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row>
            <Col className="text-center p-2 mb-3 font-huge text-uppercase">Dodaj produkt</Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center p-2 ">
              <div className="calendar-modal">
                <img src={image.preview} className="calendar-modal-image" alt="profile_picture" />
                <div>
                  <span onClick={() => inputFile.current.click()} className="calendar-modal-text">
                    Aktualizuj
                    <FaImage className="calendar-image-icon" size={20} />
                  </span>
                </div>
              </div>
              <input
                className="d-none"
                type="file"
                ref={inputFile}
                onChange={e => {
                  handleImageChange(e);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center p-2 flex-column">
              <Dropdown className="my-1">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {values.productCategory || 'Wybierz Kategorię'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category, idx) => (
                    <Dropdown.Item
                      eventKey={category.name}
                      name="productCategory"
                      key={idx}
                      onSelect={e => {
                        setFieldValue('productCategory', e);
                      }}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <ErrorMessage name="mealType" render={msg => <ErrorBox message={msg} />} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-2">
              <Field name="productName" type="text" component={CustomFormInputWithError} placeholder="Nazwa produktu" />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-2">
              <Field name="productDescription" type="text" component={CustomFormInputWithError} placeholder="Opis produktu" />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-2 mb-3">
              <Button type="submit" className="calendar-modal-submit-button text-huge text-uppercase" variant="secondary" disabled={isSubmitting}>
                {isSubmitting ? <Spinner animation="border" variant="primary" /> : 'Dodaj'}
              </Button>
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  );
};

CreateProductForm.propTypes = {};

export default CreateProductForm;
