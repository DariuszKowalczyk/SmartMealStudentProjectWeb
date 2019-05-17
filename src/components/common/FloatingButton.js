import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Link } from 'react-floating-action-button';
import { FaPlus, FaShoppingBasket, FaBook, FaCalendarDay } from 'react-icons/fa';

const FloatingButton = ({ action, name }) => (
  <Container className="custom-floating-button">
    <Link href="/Recepies" tooltip="Recepies">
      <FaBook />
    </Link>
    <Link href="/Products" tooltip="Products">
      <FaShoppingBasket />
    </Link>
    <Link href="/" tooltip="Food Calendar">
      <FaCalendarDay />
    </Link>
    <Button tooltip={name} onClick={() => action()}>
      <FaPlus />
    </Button>
  </Container>
);

FloatingButton.propTypes = {};

export default FloatingButton;
