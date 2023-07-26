import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'


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
        console.log("Could not log out")
      };
    })
  }

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
            {currentUser ? 
              <>
                <Nav.Link href="#"><Button variant="outline-primary">Account</Button></Nav.Link>
                <Button className="text-white" onClick={handleLogout}>Logout</Button>
              </>
            :
            <>
              <Nav.Link href="/login"><Button variant="outline-primary">Login</Button></Nav.Link>
              <Nav.Link href="/signup"><Button className="text-white">Create Account</Button></Nav.Link>
            </>
            }
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;