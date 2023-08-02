import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";


function NavBar({currentUser, setCurrentUser}) {

  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(r => {
      if (r.ok) {
        setCurrentUser(null)
        navigate("/")
      } else {
        alert("Could not log out at this time")
      };
    })
  }

  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" className=" bg-white">
          <Navbar.Brand href="/" className="fs-2 strong text-primary">Craft Corner</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              { currentUser ? null : <Nav.Link href="/" className="text-primary fs-5">Home</Nav.Link> }
              { currentUser ? <Nav.Link href="/dashboard" className="text-primary fs-5">Your Collection</Nav.Link> : null }
              <Nav.Link href="/projects" className="text-primary fs-5">Projects</Nav.Link>
            </Nav>
            <Nav activeKey={location.pathname} className="d-flex align-items-center">
              {currentUser ? 
                <>
                  <Nav.Link href="/account" className="text-primary fs-5 pe-lg-3">Account</Nav.Link>
                  <Button className="text-white nav-button" onClick={handleLogout}>Logout</Button>
                </>
              :
              <>
                <Nav.Link href="/login" className="text-primary fs-5 pe-lg-4">Login</Nav.Link>
                <Button className="text-white nav-button" onClick={() => navigate("/signup")}>Create Account</Button>
              </>
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;