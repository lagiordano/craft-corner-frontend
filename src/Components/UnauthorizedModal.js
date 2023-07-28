import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";


function UnauthorizedModal ({showModal, handleClose}) {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname)


    return (
            <Modal show={showModal} onHide={handleClose} centered>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
                You will need to login or create an account to access this feature
                </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" className="text-white" onClick={() => navigate("/login", {state: {location: location.pathname}})}>Login</Button>
                <Button variant="primary" className="text-white" onClick={() => navigate("/signup", {state: {location: location.pathname}})}>Create Account</Button>
              </Modal.Footer>
          </Modal>
    )

}

export default UnauthorizedModal;