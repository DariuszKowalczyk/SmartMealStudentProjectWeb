import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FaImage, FaPlus, FaTrash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form as FormikForm, Field, FieldArray } from 'formik';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { getProducts } from '../../api/products';
import { createRecipe } from '../../api/recipes';
import { ErrorBox, SuccessBox } from '../common/Notifications';
import { metrics } from '../../helpers/consts';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import recipeDefault from '../../assets/recipe_default.png';
import { findElementNameById } from '../../helpers/CustomSelectors';

import CustomDropdown from '../common/Dropdown';

const CreateRecipeSchema = Yup.object().shape({
  recipeName: Yup.string().required('Required'),
  recipeDescription: Yup.string()
    .required('Required')
    .min(4, 'should be 4 chars minimum.'),
  recipeIngredients: Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required('Required'),
      metric: Yup.string().required('Required'),
      amount: Yup.string().required('Required'),
    })
  ),
});
const CreateRecipeForm = () => {
  const [products, setProducts] = useState();

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const inputFile = useRef(null);
  const [image, setImage] = useState({
    preview: recipeDefault,
    image: null,
  });

  const handleImageDelete = () => {
    setImage({ preview: recipeDefault, image: null });
  };
  const handleImageChange = e => {
    e.preventDefault();
    setImage({ preview: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] });
  };
  return (
    <Formik
      initialValues={{
        recipeName: '',
        recipeDescription: '',
        recipeIngredients: [{ amount: '', metric: '', productId: '' }],
      }}
      validationSchema={CreateRecipeSchema}
      onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
        await createRecipe(values.recipeName, values.recipeDescription, image.image, values.recipeIngredients, resetForm, setStatus);
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, setFieldValue, isSubmitting, status }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row>
            <Col className="d-flex justify-content-center p-2 ">
              <div className="recipe-wrapper">
                <img src={image.preview} className="create-recipe-image" alt="recipe_picture" />
                <IoMdClose color="red" className="product-modal-icon-delete-image" onClick={handleImageDelete} />
                <div>
                  <span onClick={() => inputFile.current.click()} className="calendar-modal-text">
                    Aktualizuj
                    <FaImage className="calendar-image-icon" size={40} />
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
          <Row className="justify-content-center">
            <Col sm={12} md={8}>
              <Field name="recipeName" type="text" component={CustomFormInputWithError} placeholder="Recipe Name" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={12} md={8}>
              <Field name="recipeDescription" type="text" component={CustomFormInputWithError} placeholder="Recipe Description" />
            </Col>
          </Row>
          <FieldArray
            name="recipeIngredients"
            render={arrayHelpers => (
              <>
                {values.recipeIngredients.map((ingredients, index) => (
                  <div key={index}>
                    <Row className="justify-content-center">
                      <Col xs={12} sm={4} md={4}>
                        <CustomDropdown
                          array={products}
                          value={findElementNameById(products, values.recipeIngredients[index].productId)}
                          setFieldValue={setFieldValue}
                          fieldName={`recipeIngredients.${index}.productId`}
                          dropdownText="Produkt"
                        />
                      </Col>
                      <Col xs={12} sm={4} md={2}>
                        <CustomDropdown
                          array={metrics}
                          value={findElementNameById(metrics, values.recipeIngredients[index].metric)}
                          setFieldValue={setFieldValue}
                          fieldName={`recipeIngredients.${index}.metric`}
                          dropdownText="Metryka"
                        />
                      </Col>
                      <Col xs={12} sm={4} md={2}>
                        <Field name={`recipeIngredients.${index}.amount`} type="number" component={CustomFormInputWithError} placeholder="Ilość" />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={8} className="d-flex justify-content-end">
                        <FaTrash color="red" onClick={() => arrayHelpers.remove(index)} />
                      </Col>
                    </Row>
                  </div>
                ))}
                <Row className="justify-content-center">
                  <Col sm={12} md={8} className="d-flex justify-content-end my-3">
                    <FaPlus onClick={() => arrayHelpers.push({ productId: '', metric: '', amount: '' })} />
                  </Col>
                </Row>
              </>
            )}
          />
          <Row className="justify-content-center">
            <Col sm={12} md={8} className="text-center p-2 mb-3">
              <Button
                type="submit"
                className="calendar-modal-submit-button text-huge text-uppercase mb-1"
                variant="secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner animation="border" variant="primary" /> : 'Dodaj'}
              </Button>
              {status && status.msg ? <ErrorBox message={status.msg} /> : null}
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  );
};

CreateRecipeForm.propTypes = {};

export default CreateRecipeForm;
