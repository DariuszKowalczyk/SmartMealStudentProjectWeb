import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Row, Col, Dropdown, Button, Spinner } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import DefaultImage from '../../assets/default.jpg';
import { getRecipes } from '../../api/recipes';
import { findElementNameById, findElementById } from '../../helpers/CustomSelectors';
import CustomDropdown from '../common/Dropdown';
import { basicUrl, staticImages } from '../../helpers/consts'

const AddMealSchema = Yup.object().shape({
  mealType: Yup.string().required('Required'),
  mealName: Yup.string().required('Required.'),
});

const AddMealForm = ({ meals, addNewChild, closeModal, currentDate }) => {
  const inputFile = useRef(null);
  const [selectecdRecipe, setSelectedRecipe] = useState(null);
  const [image, setImage] = useState({ preview: DefaultImage, image: null });
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchRecipies = async () => {
    const response = await getRecipes(setError);
    setRecipes(response);
    setIsLoading(false);
  };

  useEffect(() => {
    
    fetchRecipies();
  }, []);

  const handleRecipeSelect = (recipe) =>{
    setSelectedRecipe(recipe);
    if(recipe.imagePath){
      setImage({preview: `${staticImages}${recipe.imagePath}`})
    }
  }
  const handleImageChange = e => {
    e.preventDefault();
    setImage(URL.createObjectURL(e.target.files[0]));
    setImage({ preview: URL.createObjectURL(e.target.files[0]), image: e.target.files[0].name });
  };
  if (isLoading) {
    return (
      <Row>
        <Col className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    );
  }
  if (error) {
    return (
      <Row>
        <Col className="d-flex justify-content-center">{error}</Col>
      </Row>
    );
  }
  if (recipes) {
    return (
      <Formik
        initialValues={{ mealName: '', mealType: '' }}
        validationSchema={AddMealSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus({});
          addNewChild(currentDate, values.mealType, values.mealName);
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
                  array={meals}
                  value={findElementNameById(meals, values.mealType)}
                  setFieldValue={setFieldValue}
                  fieldName="mealType"
                  dropdownText="Posiłek"
                />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center p-2 flex-column">
                <CustomDropdown
                  array={recipes}
                  value={findElementNameById(recipes, values.mealName)}
                  setFieldValue={setFieldValue}
                  fieldName="mealName"
                  dropdownText="Potrawa"
                  setRecipe={handleRecipeSelect}
                />
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
  }
};

AddMealForm.propTypes = {};

export default AddMealForm;
