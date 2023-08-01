import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ErrorMessages({errors}) {

    return (
        <Container className="text-secondary">
            <Row className="d-flex justify-content-center mx-2 my-4 m-md-4">
                <Col xs={11} sm={10} md={7} lg={6} className="bg-white rounded border border-danger p-2 p-md-3">
                    <h6>Sorry, something has gone wrong:</h6>
                    {errors.map( error => <p key={error} className="m-0">{error}</p>)}
                </Col>
            </Row>
        </Container>
    );

};

export default ErrorMessages;