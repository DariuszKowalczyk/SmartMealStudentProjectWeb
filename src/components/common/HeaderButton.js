import React from 'react';
import { Button } from 'react-bootstrap';

const HeaderButton = ({ value, onClick, isActive }) => (
  <Button style={{ width: '50%' }} onClick={onClick} color={isActive ? 'primary' : ''}>
    {value}
  </Button>
);
export default HeaderButton;
