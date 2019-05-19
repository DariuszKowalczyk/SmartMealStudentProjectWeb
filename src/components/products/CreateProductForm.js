import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Row, Col, Dropdown, Button, Spinner } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { rawUrl } from '../../helpers/consts';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import ProductDefault from '../../assets/product_default.png';
import { ErrorBox } from '../common/Notifications';
import CustomDropdown from '../common/Dropdown';
import { findElementNameById } from '../../helpers/CustomSelectors';

const AddMealSchema = Yup.object().shape({
  productName: Yup.string().required('Required'),
  productDescription: Yup.string()
    .required('Required')
    .min(4, 'should be 4 chars minimum.'),
});
const CreateProductForm = ({
  modalTitle,
  categories,
  closeModal,
  buttonTitle,
  buttonAction,
  activeProductName,
  activeProductDescription,
  activeProductCategory,
  activeProductImagePath,
}) => {
  const inputFile = useRef(null);

  useEffect(() => {}, [image]);
  const [image, setImage] = useState({
    preview: activeProductImagePath ? `${rawUrl}${activeProductImagePath}` : ProductDefault,
    image: activeProductImagePath || null,
  });
  const handleImageDelete = () => {
    setImage({ preview: ProductDefault, image: null });
  };
  const handleImageChange = e => {
    e.preventDefault();
    setImage({ preview: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] });
  };

  return (
    <Formik
      initialValues={{
        productName: '' || activeProductName,
        productDescription: '' || activeProductDescription,
        productCategory: '' || activeProductCategory,
      }}
      validationSchema={AddMealSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus({});
        buttonAction(values.productName, values.productDescription, image.image, values.productCategory);
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row>
            <Col className="text-center p-2 mb-3 font-huge text-uppercase">{modalTitle}</Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center p-2 ">
              <div className="calendar-modal">
                <img src={image.preview} className="calendar-modal-image" alt="profile_picture" />
                <IoMdClose color="red" className="product-modal-icon-delete-image" onClick={handleImageDelete} />
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
              <CustomDropdown
                array={categories}
                value={findElementNameById(categories, values.productCategory)}
                setFieldValue={setFieldValue}
                fieldName="productCategory"
                dropdownText="Kategoria"
              />
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
                {isSubmitting ? <Spinner animation="border" variant="primary" /> : buttonTitle}
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
