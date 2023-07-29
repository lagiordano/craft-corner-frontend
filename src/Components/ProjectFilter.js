import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

function ProjectFilter({search, setSearch, select, setSelect }) {

    const navigate= useNavigate();

    function handleCategoryChange(e){
        setSelect(e.target.value)
    }

    function handleSearchChange(e){
        setSearch(e.target.value);
    }

    return (
        <Row className="w-100 mx-2 d-flex align-items-center">
            <Col lg={3}>
                <Button variant="primary" className="text-white w-100 mt-3 my-lg-4 py-lg-2" size="lg" onClick={() => navigate("/projects/addproject")}>Add Project</Button>
            </Col>
            <Col lg={4}>
                <FloatingLabel label="Category:" className="my-3 my-lg-4 p-0">
                    <Form.Select onChange={handleCategoryChange} value={select}>
                        <option value="all">All</option>
                        <option value="fabric">Fabric</option>
                        <option value="yarn">Yarn</option>
                        <option value="home">Home</option>
                        <option value="art">Art</option>
                        <option value="kids">Kids</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col lg={5}>
                <FloatingLabel label="Search:" className="mb-3 my-lg-4 p-0">
                    <Form.Control type="text" onChange={handleSearchChange} value={search} />
                </FloatingLabel>
            </Col>
        </Row>
    )
}



export default ProjectFilter;