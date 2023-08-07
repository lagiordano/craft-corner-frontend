import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function PageNotFound ({currentUser}) {

    useEffect( () => {
        document.title = "Craft Corner | Page Not Found";
        document.body.style = 'background: rgb(250,223,223);';
    }, [])

    return (
        <Container className="text-secondary">
            <Row className="d-flex justify-content-center mx-2 my-4 m-md-5">
                <Col xs={12} sm={11} md={10} lg={7} className="bg-white rounded border border-primary p-2 p-md-3">
                    <h3 className="py-3 text-decoration-underline">Page Not Found</h3>
                    <h5 className="py-2">Looks like there is no page at this URL</h5> 
                    <h5 className="py-2">Why don't you check out some of our <Link to="/projects">projects</Link></h5>
                    <h5 className="py-2">Otherwise head over to {currentUser ? "your collection " : "our home page "}<Link to="/">here</Link></h5>
                </Col>
            </Row>
        </Container>
    )

}



export default PageNotFound;