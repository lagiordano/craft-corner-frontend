import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteConfirmation ({showModal, handleClose, handleDelete, deletedElement }) {

    return (
        <Modal
        show={showModal}
        onHide={handleClose}
        centered
      >
          <Modal.Header closeButton>
            <Modal.Title>Confirm {deletedElement === "comment" ? "Delete Comment" : "Remove Project"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you wish to {deletedElement === "comment" ? "delete your comment?" : "remove this project from your collection?"}</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>{deletedElement === "comment" ? "Delete" : "Remove"}</Button>
          </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;