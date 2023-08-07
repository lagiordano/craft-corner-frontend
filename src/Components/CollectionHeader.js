import React from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function CollectionHeader ({currentUser, setCollectionFilter, collectionFilter, setCurrentPage, setReRender, reRender}) {



    // for screen size md and up
    function handleCollectionFilterClick(e) {
        setCollectionFilter(e.target.value);
        setReRender(!reRender);
        setCurrentPage(1);
    };


    // for screen size below md
    function handleChange (e) {
        setCollectionFilter(e.target.value)
        setReRender(!reRender);
        setCurrentPage(1);
    }


    return (
        <Container>
            <Row className="py-4 my-2 bg-warning text-secondary full-width-row">
                <Col sm={12} lg={5} className="d-flex justify-content-center">
                    <h2 className="pb-2 pb-md-3 pb-lg-0">{currentUser.username}'s Collection</h2>
                </Col>
                <Col lg={7} className="d-none d-md-flex align-items-center justify-content-center">
                    <Row className="w-100">
                        <Col className="d-flex justify-content-evenly">
                            <Button variant="outline-secondary" size="sm" className="px-3" onClick={handleCollectionFilterClick} value="all" active={collectionFilter === "all" ? true : false}>All Projects</Button>
                            <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="in progress" active={collectionFilter === "in progress" ? true : false}>In Progress</Button>
                            <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="to-do" active={collectionFilter === "to-do" ? true : false}>To-Do</Button>
                            <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="completed" active={collectionFilter === "completed" ? true : false}>Completed</Button>
                            <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="shared by user" active={collectionFilter === "shared by user" ? true : false}>Shared By You</Button>
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} className="d-md-none d-flex justify-content-center">
                    <Form>
                    <Form.Select onChange={handleChange} id="collection-select" size="sm" className="bg-secondary text-white">
                        <option value="all">All Projects</option>
                        <option value="in progress">In Progress</option>
                        <option value="to-do">To-Do</option>
                        <option value="completed">Completed</option>
                        <option value="shared by user">Shared By Me</option>
                    </Form.Select>
                    </Form>
                    
                </Col> 
            </Row>
        </Container>
    )

}


export default CollectionHeader;