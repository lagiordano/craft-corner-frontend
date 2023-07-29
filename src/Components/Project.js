import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import projectPlaceholder from "../images/projectPlaceholder.jpg";
import ErrorMessages from "./ErrorMessages";
import UnauthorizedModal from "./UnauthorizedModal";

function Project({currentUser}) {

    const params = useParams()
    const navigate = useNavigate();
    const location = useLocation();

    const [project, setProject] = useState({})
    const [inCollection, setInCollection] = useState(false)
    const [errors, setErrors] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    
    
    useEffect( () => {
        document.body.style = 'background: rgb(250,223,223);';
        document.title = "Craft Corner | Project";
    }, [])


    // check if project is in user's collection
    useEffect( () => {
        fetch(`/check_in_collection/${params.id}`)
        .then(r => r.json())
        .then(json => {
            if (json.user_project_id) {
                setInCollection(true)
            } else {
                setInCollection(false)
            };
        })
        .catch(() => setErrors(["There has been an error"]))
    }, [])
    
    // load individual project
    useEffect( () => {
        fetch(`/projects/${params.id}`)
        .then(r => r.json())
        .then(json => {
            setProject(json)
            setErrors(null)
        })
        .catch(() => setErrors(["There has been an issue loading this project's information"]))
    }, [inCollection]);

    
    // check whether user is logged in
    function handleAddClick () {
        if (currentUser) {
            setShow(false);
            addToCollection();
        } else {
            setShow(true);
        };
    };
   
    // adds project to users collection
    function addToCollection() {
        fetch('/user_projects', {
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
        <Row className="my-3  mt-md-4">
            <Col sm={2} md={4} lg={5} className="d-flex justifycontent-start">
                {
                    (location.state && location.state.from === "edit") ? 
                    <Button variant="secondary" onClick={() => navigate(-3)}>Go Back</Button>
                    :
                    <Button variant="secondary" onClick={() => navigate(-1)}>{location.state ? `Back to ${location.state.from}` : "Go Back"}</Button>
                }
            </Col>
        </Row>
        {errors ? 
        <Row className="d-flex justify-content-center">
            <ErrorMessages errors={errors} />
        </Row>
        :
        <div className="d-flex justify-content-center mb-5">
            <Row id="project-container" className="border rounded pt-3 my-md-4 mx-lg-5 text-secondary bg-white border-primary">
                <Col sm={12} md={6}>
                    <div className="m-2 m-md-1 my-lg-3 ms-lg-3 me-lg-0 text-start text-wrap">
                        <h1 className="text-capitalize py-1">{project.title}</h1>
                        <h5 className="pb-2">Category: <span className="fs-6 text-capitalize">{project.category}</span></h5>
                        {
                            project.url ? 
                            <h5 className="pb-2">Link: <a href={project.url} target="_blank" rel="noreferrer" className="text-secondary fs-6">Visit project's website</a></h5>
                            :
                            null
                        }
                        <h5 className="pb-2">Shared by: <span className="fs-6">{project.shared_by ? project.shared_by : "Not available" }</span></h5> 
                        <h5 className="pb-2">Last added/edited: <span className="fs-6">{project.added_or_updated_at}</span></h5>
                        <h5 className="pb-2">Total Adds: <span className="fs-6">{project.adds}</span></h5>
                        {
                            inCollection ? 
                            <Button className="mb-2 mt-1 me-3 text-white"variant="primary" disabled>In your collection</Button>
                            : 
                            <Button className="mb-2 mt-1 me-3 text-white"variant="primary" onClick={handleAddClick}>Add to Collection</Button>
                        }
                        {
                            currentUser && project.shared_by === currentUser.username ?
                            <Button className="mb-2 mt-1 text-white" variant="primary" onClick={() => navigate(`/projects/${project.id}/editproject`, {state: {project: project}})}>Edit Project</Button>
                            :
                            null
                        }
                        <UnauthorizedModal showModal={show} handleClose={handleClose} />
                    </div>
                </Col>
                <Col sm={12} md={6} className="d-flex justify-content-center">
                    <img src={project.image || projectPlaceholder} alt={project.title} className="project m-2 ms-lg-3 mt-lg-4 border-primary rounded"/>
                </Col>
                {project.description ? 
                <Row>
                    <Col sm={12}>
                        <h5 className="m-2 m-md-1 ms-lg-3 pb-2 text-start">Description: <span className="fs-6">{project.description}</span></h5>
                    </Col>
                </Row>
                :
                null}
            </Row>
        </div>
        }
    </Container>

    )
}


export default Project;
