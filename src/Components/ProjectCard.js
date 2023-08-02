import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link, useLocation} from "react-router-dom";
import projectPlaceholder from "../images/projectPlaceholder.jpg";



function ProjectCard({image, title, id}) {

    const location = useLocation();
    
    let fromValue;
    if (location.pathname === "/") {
        fromValue = "Home" 
    } else {
        fromValue = "Projects"
    };
    
    return (
        <Col>
            <Link to={`/projects/${id}`} state={{from: fromValue}} className="text-decoration-none">
                <Card >
                    <Card.Img variant="top" src={image || projectPlaceholder} alt={title} />
                    <Card.Body className="d-flex align-items-center justify-content-center">
                        <Card.Title className="text-secondary">{title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}


export default ProjectCard;

