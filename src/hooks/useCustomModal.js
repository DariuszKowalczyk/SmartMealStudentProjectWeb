import React, { useState, useCallback, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [props, setProps] = useState(null);
  const openModal = useCallback(newProps => {
    setProps(newProps);
  }, []);

  const closeModal = useCallback(() => {
    setProps(null);
  }, []);

  useEffect(() => {
    console.log(props, 'PROPS');
    setOpen(props !== null);
  }, [props]);

  const modal = useCallback(
    ({ children }) => (
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Body>
          <div>{children}</div>
        </Modal.Body>
      </Modal>
    ),
    [closeModal, isOpen, props]
  );

  return [modal, { openModal, closeModal }];
};

export default useModal;
