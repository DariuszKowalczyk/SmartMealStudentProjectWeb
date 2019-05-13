import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const useModal = props => {
  const [show, setShow] = useState(false);
  const onHide = () => {
    setShow(false);
  };
  const toggle = () => {
    setShow(true);
  };

  return { show, onHide, toggle };
};
export default useModal;
