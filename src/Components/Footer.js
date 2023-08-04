import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Footer() {

    return (
        <footer className="bg-primary">
            <Row className="d-flex justify-content-center">
                <Col>
                    <Link className="text-decoration-none align-items-center text-white" to={"privacypolicyt&cs"}>Privacy Policy and Terms & Conditions</Link>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;