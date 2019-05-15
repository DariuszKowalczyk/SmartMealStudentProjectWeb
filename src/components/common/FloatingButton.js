import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-floating-action-button';
import { FaPlus } from 'react-icons/fa';

const FloatingButton = ({ action }) => (
  <Button className="custom-floating-button" onClick={() => action()}>
    <FaPlus />
  </Button>
);

FloatingButton.propTypes = {};

export default FloatingButton;
