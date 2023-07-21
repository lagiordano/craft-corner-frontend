import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteConfirmation ({showModel, handleClose, userProjectID, handleDelete }) {

    return (
        <Modal
        show={showModel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to remove this project from your collection?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary">Remove</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;