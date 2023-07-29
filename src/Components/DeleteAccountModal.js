import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function DeleteAccountmodal({showModal, handleClose, handleDelete}) {

    return (
        <Modal
        show={showModal}
        onHide={handleClose}
        centered
      >
          <Modal.Header closeButton>
            <Modal.Title>Permanently Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you wish to delete your account? Your project colelction will be erased with your account.</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
      </Modal>
    )

}

export default DeleteAccountmodal;