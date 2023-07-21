import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import projectPlaceholder from "../images/projectPlaceholder.jpg";
import ErrorMessages from "./ErrorMessages";

function Project() {

    const params = useParams()
    const navigate = useNavigate();
    const [project, setProject] = useState({})
    const [inCollection, setInCollection] = useState(false)
    const [errors, setErrors] = useState(null)
    
    useEffect( () => {
        document.body.style = 'background: rgb(250,223,223);';
        document.title = "Craft Corner | Project";
    }, [])

    useEffect( () => {
        fetch(`http://localhost:3000/in_collection/${params.id}`)
        .then(r => r.json())
        .then(json => {
            if (json.in_collection === true) {
                setInCollection(true)
            } else {
                setInCollection(false)
            };
        })
        .catch(() => setErrors(["There has been an error"]))
    }, [])
    
    useEffect( () => {
        fetch(`http://localhost:3000/projects/${params.id}`)
        .then(r => r.json())
        .then(json => {
            setProject(json)
            setErrors(null)
        })
        .catch(() => setErrors(["There has been an issue loading this project's information"]))
    }, [inCollection]);

    
    function handleAddClick () {
        fetch('http://localhost:3000/user_projects', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                project_id: project.id,
                completed_status: "wish list"
            })
        })
        .then(r => r.json())
        .then(json => {
            if (json.errors) {
                setErrors(json.errors)
            } else {
                setErrors(null)
                setInCollection(true)
            }
        })
        .catch( () => setErrors(["Could not add project to your collection"]))
    }
   



    return (
       
    <Container className="mb-5">
        <Row className="mt-3">
            <Col sm={2} md={3} lg={4} className="d-flex justifycontent-start">
                <Button className="text-white"variant="primary" onClick={() => navigate(-1)}>{"<<"} Back to Projects</Button>
            </Col>
        </Row>
        {errors ? 
        <Row className="d-flex justify-content-center">
            <ErrorMessages errors={errors} />
        </Row>
        :
        <div className="border rounded my-4 mx-1 mx-sm-2 mx-md-4 my-md-4 m-lg-5 text-secondary bg-white border-primary position-relative">
            <Row >
                <Col>
                    <h1 className="text-capitalize mt-2 mt-md-3 mt-lg-4">{project.title}</h1>
                </Col>
            </Row>
            <Row className="d-flex align-items-center">
                <Col sm={12} md={6} className="d-flex justify-content-center">
                    <img src={project.image || projectPlaceholder} alt={project.title} className="project m-3 m-lg-4 border-primary rounded"/>
                </Col>
                <Col sm={12} md={6}>
                    <div className="m-3 my-lg-3 me-lg-3 text-start text-wrap">
                        <h5 className="pb-2">Category: <span className="fs-6 text-capitalize">{project.category}</span></h5>
                        <h5 className="pb-2">Description: <span className="fs-6">{project.description}</span></h5>
                        <h5 className="pb-2">Tutorial: <a href={project.url} target="_blank" rel="noreferrer" className="text-secondary fs-6">Visit project's website</a></h5>
                        {project.shared_by ? <h5 className="pb-2">Shared by: <span className="fs-6">{project.shared_by}</span></h5> : null}
                        <h5 className="pb-2">Last added/edited: <span className="fs-6">{project.added_or_updated_at}</span></h5>
                        <h5 className="pb-2">Total Adds: <span className="fs-6">{project.adds}</span></h5>
                        
                        {
                        inCollection ? 
                        <Button className="mb-2 mt-1 text-white"variant="primary" disabled>In your collection</Button>
                        : 
                        <Button className="mb-2 mt-1 text-white"variant="primary" onClick={handleAddClick}>Add to Collection</Button>
                        }
                    </div>
                    
                </Col>
            </Row>
        </div>
        }
    </Container>

    )
}


export default Project;
