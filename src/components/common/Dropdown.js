import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import { ErrorBox } from './Notifications';

const CustomDropdown = ({ array, value, setFieldValue, fieldName, dropdownText, setRecipe }) => (
  <>
    <Dropdown className="my-1">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {value || dropdownText}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {array &&
          array.map((element, idx) => (
            <Dropdown.Item
              eventKey={element.id}
              name="productCategory"
              key={idx}
              onSelect={e => {
                setFieldValue(fieldName, parseInt(e));
                if(setRecipe){
                  setRecipe(element);
                }
              }}
            >
              {element.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
    <ErrorMessage name={fieldName} render={msg => <ErrorBox message={msg} />} />
  </>
);

export default CustomDropdown;
