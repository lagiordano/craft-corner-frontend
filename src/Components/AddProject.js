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
        url: null,
        category: "",
        completedStatus: "",
        description: "", 
        title: "", 
        image: ""
    })

    function handleImageChange(e) {
        setNewProject({
            ...newProject, 
            image: e.target.files[0]
        })
    }


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
        const formData = new FormData();
        formData.append('title', newProject.title);
        formData.append('category', newProject.category);
        if (newProject.url !== "") {
            formData.append('url', newProject.url);
        };
        if (newProject.image !== "") {
            formData.append('image', newProject.image)
        };
        formData.append('description', newProject.description);
        formData.append('completed_status', newProject.completedStatus);


        fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: {
                
            },
            body: formData,
        })
        .then(r => r.json())
        .then(json => {
            console.log(json)
            if (json.errors) {
                setErrors(json.errors)
            } else {
                setNewProject({
                    url: null,
                    category: "", 
                    completedStatus: "",
                    description: "",
                    title: "", 
                    image: ""
                });
                setErrors(null)
                navigate(`/projects/${json.id}`)
            };
        });  
    }


    return (
        <Container className="mb-5">
                {errors ? 
                <Row className="d-flex justify-content-center">
                    <ErrorMessages errors={errors} />
                </Row>
                :
                null   
                }
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={10} lg={9} className="bg-white p-2 p-md-3 p-lg-4 m-3 m-md-5 rounded text-secondary">
                        <h3 className="p-2">Add a New Project</h3>
                        <p className="p-2 text-start">This will be added to your collection and be made available in our shared projects page. If the project you are adding is an online link (e.g. blog, instagram post) we will automatically include an image for your project. If the project you are adding is from a book or your own creation, leave the 'Link' field blank and you can upload an image of your own.  </p>
                        <Form onSubmit={handleSubmit} className="text-start">
                            <Row className="p-2">
                                    <Col sm={12} lg={2}>
                                        <Form.Label  >Title:</Form.Label>
                                    </Col>
                                    <Col sm={12} lg={10}>
                                        <Form.Control type="text" name="title" required placeholder="Enter project title here..." onChange={handleFormChange} />
                                    </Col>
                            </Row>
                            <Row className="p-2">
                                <Col sm={12} lg={2}>
                                    <Form.Label >Category:</Form.Label>
                                </Col>
                                <Col sm={12} lg={10}>
                                    <Form.Select required onChange={handleCategorySelect}>
                                        <option value="">Select Category</option>
                                        <option name="category" value="yarn">Yarn</option>
                                        <option name="category" value="fabric">Fabric</option>
                                        <option name="category" value="home">Home</option>
                                        <option name="category" value="art">Art</option>
                                        <option name="category" value="kids">Kids</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Link:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Control type="url" name="url" placeholder="example.com/craftproject" value={newProject.url} onChange={handleFormChange} />
                                    <Form.Text className="ps-1">If project is from another website, copy the url/link here</Form.Text>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Upload image:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Control type="file" name="image" onChange={handleImageChange}/>
                                    <Form.Text className="ps-1">Not required if you provide a url (website link) to the project</Form.Text>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Description:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Control required as="textarea" name="description" rows={10} onChange={handleFormChange} />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Your Progress:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Check inline required name="completedStatus" label="In Progress" type="radio" value="in progress" onChange={handleFormChange}/>
                                    <Form.Check inline required name="completedStatus" label="Wish List" type="radio" value="wish list" onChange={handleFormChange} />
                                    <Form.Check inline required name="completedStatus" label="Completed" type="radio" value="completed" onChange={handleFormChange}/><br/>
                                    <Form.Text className="ps-1">Have you already started this project? Select a status above to help sort your collection</Form.Text>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit" className="p-2 text-white m-3">Submit</Button>
                                </Col>
                            </Row>
                            
                            
                        </Form>
                    </Col>
                </Row>
        </Container>
    )


}

export default AddProject;