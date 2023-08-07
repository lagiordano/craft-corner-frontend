import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ErrorMessages from "./ErrorMessages";

function EditProject() {

    const navigate = useNavigate();
    const { state } = useLocation();    
    const project = state.project;

    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [updatedProject, setUpdatedProject] = useState({
        title: project.title, 
        category: project.category,
        url: "",
        image: null,
        description: project.description
    });

    useEffect( () => {
        document.body.style = 'background: rgb(250,223,223);';
        document.title = "Craft Corner | Edit Project";
    }, [])

    function handleFormChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUpdatedProject({
            ...updatedProject, 
            [name]: value
        });
    };

    function handleCategorySelect(e) {
        setUpdatedProject({
            ...updatedProject, 
            category: e.target.value
        });
    };

    function handleImageChange(e) {
        setUpdatedProject({
            ...updatedProject, 
            image: e.target.files[0]
        })
    }


    // Submits updates to project. Users are only given option to edit if it is a project they originally shared
    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData()
        formData.append('title', updatedProject.title);
        formData.append('category', updatedProject.category);
        if (updatedProject.url !== "") {
            formData.append('url', updatedProject.url)
        };
        if (updatedProject.description) {
            formData.append('description', updatedProject.description)
        };
        if (updatedProject.image) {
            formData.append('image', updatedProject.image)
        };

        fetch(`/projects/${project.id}`, {
            method: "PATCH", 
            body: formData,
        })
        .then(r => {
            if (r.ok) {
                setErrors(null)
                navigate(`/projects/${project.id}`, {state: {from: "edit"}, currentPage: null})
            } else {
                r.json().then(json => {
                    setIsLoading(false)
                    json.errors ? setErrors(json.errors) : setErrors(["Unable to add edit project at this time"])
                });
            };
        })
        .catch(() => setErrors(["Unable to edit project at this time"]));

    }



    return (
        <Container className="text-secondary mb-5">
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={10} lg={9} className="bg-white p-2 p-md-3 p-lg-4 m-3 m-md-5 rounded border border-primary text-secondary">
                    <h1>Edit Your Project</h1>
                    <Form onSubmit={handleSubmit} className="text-start pt-3">
                        <Row className="p-2">
                            <Col sm={12} lg={2}>
                                <Form.Label>Title:</Form.Label>
                            </Col>
                            <Col sm={12} lg={10}>
                                <Form.Control type="text" name="title" onChange={handleFormChange} value={updatedProject.title} />
                            </Col>
                        </Row>
                        <Row className="p-2">
                            <Col sm={12} lg={2}>
                                <Form.Label >Category:</Form.Label>
                            </Col>
                            <Col sm={12} lg={10}>
                                <Form.Select onChange={handleCategorySelect} defaultValue={project.category}>
                                    <option name="category" value="yarn">Yarn</option>
                                    <option name="category" value="fabric">Fabric</option>
                                    <option name="category" value="home">Home</option>
                                    <option name="category" value="art">Art</option>
                                    <option name="category" value="kids">Kids</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        {
                            project.url !== null ?
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Link:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Control type="url" name="url" value={updatedProject.url} placeholder={project.url} onChange={handleFormChange} />
                                </Col>
                            </Row>
                            :
                            <>
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Upload image:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Control type="file" accept="image/*" name="image" onChange={handleImageChange}/>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col xs={12} lg={2}>
                                    <Form.Label>Description:</Form.Label>
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Form.Control required as="textarea" name="description" value={updatedProject.description} rows={10} onChange={handleFormChange} />
                                </Col>
                            </Row>
                            </>
                        }
                        { errors ? 
                        <Row className="p-0 m-0">
                            <ErrorMessages errors={errors} />
                        </Row>
                        :
                        null }
                        <Row className="p-2">
                            <Col className="d-flex justify-content-center">
                                <Button variant="secondary" disabled={isLoading} className="p-2 m-3" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button variant="primary" type="submit" disabled={isLoading} className="p-2 text-white m-3">Update Project</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}


export default EditProject;