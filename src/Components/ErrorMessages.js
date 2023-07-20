import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ErrorMessages({errors}) {

    return (
        <Container>
            <Row
            className="d-flex, justify-content-center mt-5">
                <Col xs={10} md={8} lg={6} className="bg-white border border-danger text-danger rounded text-start p-3">
                    <h6>Sorry, looks like there has been an error/s:</h6>
                    <ul>
                        {errors.map( error => <li>{error}</li>)}
                    </ul>
                </Col>
            </Row>
        </Container>
    );

};

export default ErrorMessages;