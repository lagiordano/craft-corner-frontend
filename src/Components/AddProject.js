import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorMessages from "./ErrorMessages";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function AddProject() {

    useEffect( () => {
        document.title = "Craft Corner | Add Project";
        document.body.style = 'background: rgb(250,223,223);';
        localStorage.clear();
    }, [])
    

    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [hasLink, setHasLink] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [newProject, setNewProject] = useState({
        url: "",
        category: "",
        completedStatus: "",
        description: "", 
        title: "", 
        image: ""
    })


    // Reset's state of newProject.image if user clicks "has url"
    function handleHasLink(){
        setHasLink(true)
        setNewProject({...newProject, image: ""})
    }

    // Reset's state of newProject.url if user clicks "no url"
    function handleNoLink() {
        setHasLink(false)
        setNewProject({...newProject, url: ""})
    }


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
        setIsLoading(true);
        setErrors(null);

        if (!hasLink) {
            setNewProject({...newProject, url: ""})
            
        } else {
            setNewProject({...newProject, image: ""})
        };

        // Create form data object (required for image storage with cloudinary)
        const formData = new FormData();
        formData.append('title', newProject.title);
        formData.append('category', newProject.category);
        if (newProject.image !== "") {
            formData.append('image', newProject.image)
        };
        if (newProject.url !== "") {
            formData.append('url', newProject.url);
        };
        formData.append('description', newProject.description);
        formData.append('completed_status', newProject.completedStatus);


        fetch("/projects", {
            method: "POST",
            body: formData,
        })
        .then(r => {
            if (r.ok) {
                r.json().then(json => {
                    navigate(`/projects/${json.id}`)
                })
            } else {
                r.json().then(json => {
                    setIsLoading(false);
                    json.errors ? setErrors(json.errors) : setErrors(["Unable to add new project at this time"])
                })
            };
        })
        .catch(() => setErrors(["Unable to add new project at this time"]))
    }

   
    return (
        <Container>
            <Row className="d-flex justify-content-center mx-1">
                <Col xs={12} md={10} lg={9} className="bg-white p-2 p-md-3 p-lg-4 my-3 m-md-5 rounded border border-muted text-secondary">
                    <h2 className="p-2">Add a New Project</h2>
                    <h6 className="p-2">This will be added to your collection and be made available in our shared projects page.</h6>
                    <h6 className="p-2">Before we start, is the project you are adding from another website? (e.g. blog, social media) </h6>
                    <ButtonGroup className="p-2">
                                <ToggleButton type="radio" variant="outline-secondary" name="link" onClick={handleHasLink} checked={hasLink === true}>Yes</ToggleButton>
                                <ToggleButton type="radio" variant="outline-secondary" name="link" onClick={handleNoLink} checked={hasLink === false}>No</ToggleButton>
                    </ButtonGroup>
                        
                    <Form onSubmit={handleSubmit} className={hasLink === null ? "d-none" : "text-start pt-3"}>
                        <Row className="p-2">
                                <Col sm={12} lg={2}>
                                    <Form.Label  >Title:</Form.Label>
                                </Col>
                                <Col sm={12} lg={10}>
                                    <Form.Control type="text" name="title" required placeholder="Enter project title here..." onChange={handleFormChange} />
                                    <Form.Text className="text-light">Max of 60 characters allowed</Form.Text>
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
                        
                        { 
                        hasLink ? 
                        <Row className="p-2">
                            <Col xs={12} lg={2}>
                                <Form.Label>Link:</Form.Label>
                            </Col>
                            <Col xs={12} lg={10}>
                                <Form.Control type="url" name="url" required placeholder="example.com/craftproject" value={newProject.url} onChange={handleFormChange} />
                                <Form.Text className="text-light">We will use an image from the url you provide</Form.Text>
                            </Col>
                        </Row>
                        :
                        null
                        }

                        { hasLink ? 
                        null
                        :
                        <Row className="p-2">
                            <Col xs={12} lg={2}>
                                <Form.Label>Upload image:</Form.Label>
                            </Col>
                            <Col xs={12} lg={10}>
                                <Form.Control type="file" accept="image/*" name="image" onChange={handleImageChange}/>
                            </Col>
                        </Row>
                        }

                        <Row className="p-2">
                            <Col xs={12} lg={2}>
                                <Form.Label>Description:</Form.Label>
                            </Col>
                            <Col xs={12} lg={10}>
                                <Form.Control required={hasLink ? false : true} as="textarea" name="description" rows={10} onChange={handleFormChange} />
                            </Col>
                        </Row>
                        <Row className="p-2">
                            <Col xs={12} lg={2}>
                                <Form.Label>Your Progress:</Form.Label>
                            </Col>
                            <Col xs={12} lg={10}>
                                <Form.Check inline required name="completedStatus" label="In Progress" type="radio" value="in progress" onChange={handleFormChange}/>
                                <Form.Check inline required name="completedStatus" label="To-Do" type="radio" value="to-do" onChange={handleFormChange} />
                                <Form.Check inline required name="completedStatus" label="Completed" type="radio" value="completed" onChange={handleFormChange}/><br/>
                                <Form.Text className="ps-1 text-light">Have you already started this project? Select a status above to help sort your collection</Form.Text>
                            </Col>
                        </Row>
                        {errors ? 
                        <Row className="p-0 m-0">
                            <ErrorMessages errors={errors} />
                        </Row>
                        :
                        null }
                        <Row className="p-2">
                            <Col className="d-flex justify-content-center">
                                <Button variant="secondary" disabled={isLoading} className="p-2 m-3" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button variant="primary" type="submit" disabled={isLoading} className="p-2 text-white m-3">{isLoading ? "Adding..." : "Add Project"}</Button>
                            </Col>
                        </Row>
                        
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    )


}

export default AddProject;