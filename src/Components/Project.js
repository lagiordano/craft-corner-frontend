import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import projectPlaceholder from "../images/projectPlaceholder.jpg";
import ErrorMessages from "./ErrorMessages";
import UnauthorizedModal from "./UnauthorizedModal";
import Comments from "./Comments";

function Project({currentUser}) {

    useEffect( () => {
        window.onpopstate = function(e) {
            console.log(e)
        }
    }, )
        
    
    

    const params = useParams()
    const navigate = useNavigate();

    // console.log(location)

    const [project, setProject] = useState({})
    const [inCollection, setInCollection] = useState(false)
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const previousPage = localStorage.getItem('previousLocation')
    

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)


    
    
    useEffect( () => {
        document.body.style = 'background: rgb(250,223,223);';
        document.title = "Craft Corner | Project";
    }, [])


    // check if project is in user's collection
    useEffect( () => {
        if (currentUser) {
            fetch(`/check_in_collection/${params.id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(json => {
                        json.user_project_id ? setInCollection(true) : setInCollection(false);
                    });
                } else {
                    setErrors(["Unable to load project information at this time"])
                }
            })
            .catch(() => setErrors(["Unable to load project information at this time"]))
        }
    }, [project, currentUser, params.id])
    

    // load individual project
    useEffect( () => {

        setIsLoading(true);
        fetch(`/projects/${params.id}`)
        .then(r => {
            if (r.ok) {
                r.json().then(json => setProject(json));
            } else {
                setErrors(["Could not load project information"]);
            };
            setIsLoading(false);
        })
        .catch(() => setErrors(["Unable to load project information at this time"]))
    }, [inCollection, params.id]);

    
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
                completed_status: "to-do"
            })
        })
        .then(r => {
            if (r.ok) {
                setInCollection(true);
                setErrors(null);
            } else {
                r.json().then(json => {
                    json.errors ? setErrors(json.errors) : setErrors(["Could not add project to your collection at this time"])
                });
            };  
        })
        .catch(["Could not add project to your collection at this time"])
    };

    
    function handleBackClick() {
        
        if (previousPage && previousPage === "Projects") {
            const route = previousPage.toLowerCase()
            navigate(`/${route}`)
        } else if (previousPage && previousPage === "Collection") {
            navigate("/dashboard")
        } else {
            navigate("/")
        }
    }
    
     

    return (
       
    <Container className={isLoading ? "d-none" : "mt-2 mb-3"}>
        <Row className="my-3 mt-md-4">
            <Col sm={2} md={4} lg={5} className="d-flex justify-content-start">
                {
                    errors ? <Button variant="secondary" onClick={() => navigate("/")}>Return Home</Button>
                    :
                    <Button variant="secondary" className="text-white" onClick={handleBackClick}>{previousPage ? `Return to ${previousPage}` : "Go Back"}</Button>
                }
            </Col>
        </Row>
        {errors ? 
        <Row className="d-flex justify-content-center">
            <ErrorMessages errors={errors} />
        </Row>
        :
        <Container className="d-flex justify-content-center mb-2">
            <Row id="project-container" className="border rounded pt-3 my-md-4 mx-lg-5 text-secondary bg-white border-muted">
                
                <Col sm={12} md={6}>
                    <div className="m-2 m-md-1 my-lg-2 ms-lg-3 me-lg-0 text-start text-wrap">
                        <h2 className="text-capitalize p-1">{project.title}</h2>
                        {
                            inCollection ? 
                            <Button className="mb-3 mt-1 me-3 text-white"variant="primary" disabled>In your collection</Button>
                            : 
                            <Button className="mb-3 mt-1 me-3 text-white"variant="primary" onClick={handleAddClick}>Add to Collection</Button>
                        }
                        {
                            currentUser && project.shared_by === currentUser.username ?
                            <Button className="mb-3 mt-1 text-white" variant="primary" onClick={() => navigate(`/projects/${project.id}/editproject`, {state: {project: project}})}>Edit Project</Button>
                            :
                            null
                        }
                        <h5 className="pb-2">Category: <span className="fs-6 text-capitalize">{project.category}</span></h5>
                        {
                            project.url ? 
                            <h5 className="pb-2">Link: <a href={project.url} target="_blank" rel="noreferrer" className="text-secondary fs-6">Visit project's website</a></h5>
                            :
                            null
                        }
                        {
                            project.shared_by ? 
                            <h5 className="pb-2">Shared by: <span className="fs-6">{project.shared_by}</span></h5>
                            : 
                            null 
                        }
                        <h5 className="pb-2">Last added/edited: <span className="fs-6">{project.added_or_updated_at}</span></h5>
                        <h5 className="pb-2">Total Adds: <span className="fs-6">{project.adds}</span></h5>
                        
                        <UnauthorizedModal showModal={show} handleClose={handleClose} />
                    </div>
                </Col>
                <Col sm={12} md={6} className="d-flex justify-content-center">
                    <img src={project.image || projectPlaceholder} alt={project.title} className="project m-1 mb-3 ms-md-0 my-md-3  border-primary rounded"/>
                </Col>
                {project.description ? 
                <Container>
                    <Row>
                        <Col className="text-start px-4 mt-md-2 mt-lg-3">
                            <h4 className="text-center">Description</h4>
                            <p id="project-description">{project.description}</p>
                        </Col>
                    </Row>
                </Container>
                :
                null}
                {project.comments === undefined ? 
                null 
                :
                <Container className="my-1 my-md-2 mt-lg-3 mb-lg-4">
                    <Comments comments={project.comments} projectID={project.id} currentUser={currentUser} />
                </Container>
                }
            </Row>
        </Container>
        
        }
    </Container>
    )
}


export default Project;
