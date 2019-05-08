import React from 'react';
import { Button } from 'rbx';

const HeaderButton = ({ value, onClick, isActive }) => (
  <Button fullwidth size="medium" onClick={onClick} color={isActive ? 'primary' : ''}>
    {value}
  </Button>
);
export default HeaderButton;
