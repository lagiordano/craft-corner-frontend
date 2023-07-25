import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import projectPlaceholder from "../images/projectPlaceholder.jpg";



function ProjectCard({image, title, id}) {


    return (
        <Col>
            <Link to={`/projects/${id}` } state={{from: "Projects"}} className="text-decoration-none">
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

