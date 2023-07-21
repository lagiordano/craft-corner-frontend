import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorMessages from "./ErrorMessages";

function AddProject() {

    useEffect( () => {
        document.title = "Craft Corner | Add Project";
        document.body.style = 'background: rgb(250,223,223);';
    })
    

    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    const [newProject, setNewProject] = useState({
        url: "",
        category: "",
        completedStatus: ""
    })


    function handleCategorySelect(e) {
        setNewProject({
            ...newProject, 
            category: e.target.value
        })
    }

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setNewProject({
            ...newProject,
            [name]: value
        });
    };

    function handleSubmit(e){
    
        e.preventDefault();
        const data = {
            url: newProject.url,
            category: newProject.category,
            completed_status: newProject.completedStatus
        }

        fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(json => {
            if (json.errors) {
                setErrors(json.errors)
            } else {
                setNewProject({
                    url: "",
                    category: "", 
                    completedStatus: ""
                });
                setErrors(null)
                navigate(`/projects/${json.id}`)
            };
        });  
    }


    return (
        <Container>
                {errors ? 
                <Row className="d-flex justify-content-center">
                    <ErrorMessages errors={errors} />
                </Row>
                :
                null   
                }
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={10} lg={8} className="bg-white p-2 p-md-3 p-lg-4 m-3 m-md-5 rounded text-secondary ">
                        <h3 className="p-2">Add a New Project</h3>
                        <p className="p-2">This will be added to your collection and be made available in our shared projects page</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formGroupCategory" className="p-2">
                                <Form.Label className="pe-3">Project Category:</Form.Label>
                                <Form.Select required onChange={handleCategorySelect}>
                                    <option value="">Select Category</option>
                                    <option name="category" value="yarn">Yarn</option>
                                    <option name="category" value="fabric">Fabric</option>
                                    <option name="category" value="home">Home</option>
                                    <option name="category" value="art">Art</option>
                                    <option name="category" value="kids">Kids</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formGroupUrl" className="p-2">
                                    <Form.Label className="d-inline pe-3">Project Link:</Form.Label>
                                    <Form.Control className="w-50 d-inline" required type="url" name="url" placeholder="example.com/craftproject" value={newProject.url} onChange={handleFormChange} />
                            </Form.Group>
                            <Form.Group controlId="formGroupCompleted_Status" className="p-2">
                                <Form.Label className="pe-3">Your Project Progress:</Form.Label>
                                <Form.Check inline required name="completedStatus" label="In Progress" type="radio" value="in progress" onChange={handleFormChange}/>
                                <Form.Check inline required name="completedStatus" label="Wish List" type="radio" value="wish list" onChange={handleFormChange} />
                                <Form.Check inline required name="completedStatus" label="Completed" type="radio" value="completed" onChange={handleFormChange}/>
                            </Form.Group>
                        
                            <Button variant="primary" type="submit" className="p-2 text-white">Submit</Button>
                        </Form>
                    </Col>
                </Row>
        </Container>
    )


}

export default AddProject;