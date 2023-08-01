import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import { useErrorBoundary } from "react-error-boundary";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function GeneralFallbackComponent() {

    const { resetBoundary } = useErrorBoundary();

    useEffect( () => {
        document.title = "Craft Corner | Page Not Found";
        document.body.style = 'background: rgb(250,223,223);';
    }, [])

    return (

        <Container role="alert">
            <Row className="d-flex justify-content-center mx-2 my-4 m-md-5">
                <Col xs={12} sm={11} md={10} lg={7} className="bg-white rounded border border-danger p-2 p-md-3">
                    <p className="p-2">Oops, something appears to have gone wrong. Sorry about this!</p>
                    <p className="pb-2">Try again below and please come back later if you don't have any luck right now.</p>
                    <Button onClick={resetBoundary} variant="secondary" size="sm" className="pb-2">Try again</Button>
                </Col>
            </Row>
               
        </Container>
    )
 
    

}


export default GeneralFallbackComponent;