import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Row, Col, Dropdown, Button, Spinner } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import DefaultImage from '../../assets/default.jpg';
import { ErrorBox } from '../common/Notifications';

const AddMealSchema = Yup.object().shape({
  mealType: Yup.string().required('Required'),
  mealName: Yup.string()
    .required('Required.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});
const AddMealForm = ({ meals, addNewChild, closeModal }) => {
  const inputFile = useRef(null);
  const [image, setImage] = useState({ preview: DefaultImage, image: null });
  useEffect(() => {}, [image]);

  const handleImageChange = e => {
    e.preventDefault();
    setImage(URL.createObjectURL(e.target.files[0]));
    setImage({ preview: URL.createObjectURL(e.target.files[0]), image: e.target.files[0].name });
  };

  return (
    <Formik
      initialValues={{ mealName: '', mealType: '' }}
      validationSchema={AddMealSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus({});
        addNewChild(values.mealName, values.mealType, image.image);
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row>
            <Col className="text-center p-2 mb-3 font-huge text-uppercase">Dodaj posiłek</Col>
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
                  {meals[values.mealType] || 'Wybierz Posiłek'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {meals.map((meal, idx) => (
                    <Dropdown.Item
                      eventKey={idx}
                      name="mealType"
                      key={idx}
                      onSelect={e => {
                        setFieldValue('mealType', parseInt(e));
                      }}
                    >
                      {meal}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <ErrorMessage name="mealType" render={msg => <ErrorBox message={msg} />} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-2">
              <Field name="mealName" type="text" component={CustomFormInputWithError} placeholder="Nazwa posiłku" />
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

AddMealForm.propTypes = {};

export default AddMealForm;
