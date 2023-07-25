import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'


function NavBar() {

  const location = useLocation();


  return (
    <Navbar collapseOnSelect expand="lg" className="px-5 bg-white">
        <Navbar.Brand href="/" className="fs-2 strong text-primary">Craft Corner</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link href="/projects" className="text-primary fs-5">Projects</Nav.Link>
            <Nav.Link href="/dashboard" className="text-primary fs-5">Your Collection</Nav.Link>
            <Nav.Link href="/projects/addproject" className="text-primary fs-5">Add New Project</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#"><Button variant="outline-primary">Account</Button></Nav.Link>
            <Nav.Link href="#"><Button className="text-white">Logout</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;