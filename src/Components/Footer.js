import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Footer() {

    return (
        <footer className="mt-auto bg-primary p-1">
            <Row className="d-flex justify-content-center">
                <Col>
                    <Link className="text-decoration-none pl-3 align-items-center text-white" to={"privacypolicy+T&C's"}>Privacy Policy and Terms of Use</Link>
                </Col>
                <Col>
                    <Link className="fs-6 text-decoration-none pl-3 text-white" to={"communityguidelines"}>Community Guidelines</Link>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;