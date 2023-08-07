import React, {useState, useEffect} from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import projectPlaceholder from "../images/projectPlaceholder.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DeleteConfirmation from "./DeleteConfirmation";


function CollectionCard({completedStatus, project, setCollectionFilter, setReRender, reRender, setCurrentPage, currentPage}) {

   
   const location = useLocation();
    const [completedValue, setCompletedValue] = useState(completedStatus)
    const [userProjectId, setUserProjectId] = useState(null);
    const [hasError, setHasError] = useState(false)
  
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    
    // checks if project is currently in collection
    useEffect( () => {
        fetch(`/check_in_collection/${project.id}`)
        .then(r => {
            if (r.ok) {
                r.json().then(json => {
                    if (json.user_project_id !== null) {
                        setUserProjectId(json.user_project_id)
                    } else {
                        setUserProjectId(null)
                    };
                });
            } else {
                setHasError(true)
            };
        })
        .catch(() => setHasError(true))
    }, [])

    

    //  updates completed status of user-project
    function handleChange(e) {
        const newStatus = e.target.value
        fetch(`/user_projects/${userProjectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({completed_status: newStatus})
        })
        .then(r => {
            if (r.ok) {
                    setHasError(false);
                    setCompletedValue(() => newStatus)
                    setCollectionFilter(newStatus)
                    setCurrentPage(1);
                } else {
                    setHasError(true);
                }
            })
        .catch(() => setHasError(true))
    }

    // deletes user-project from collection
    function handleDelete() {
        setShow(false);
        fetch(`/user_projects/${userProjectId}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.ok) {
                setUserProjectId(null);
                setReRender(!reRender)
                setHasError(false)
            } else {
                setHasError(true)
            }
        })
        .catch(() => setHasError(true))
    }

    // renders confirm delete modal
    function handleConfirmDelete() {
        setShow(true);
    }

    // adds project to users collection
    function handleAddClick() {
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
                r.json().then(json => {
                    setHasError(false)
                    setUserProjectId(json.id)
                })
            } else {
                setHasError(true)
            };
        })
        .catch( () => setHasError(true))
    }
    
    

    return (
        <Col>
            <Card>
                {hasError ?
                <Card.Body className="d-flex align-items-center">
                    <Card.Text className="p-3 text-danger">Sorry, an error has occurred</Card.Text>
                </Card.Body>
                :
                <>
                <Link to={`/projects/${project.id}`} state={{from: "Collection", currentPage: currentPage, pathname: location.pathname}} className="text-decoration-none">
                    <Card.Img variant="top" src={project.image || projectPlaceholder} alt={project.title} />
                    <Card.Body>
                        <Card.Text className="text-secondary text-capitalize text-strong">{project.title}</Card.Text>
                    </Card.Body>
                </Link>
                    {userProjectId ?
                    <>
                        <div className="justify-content-center d-flex mt-auto">
                            <Form.Select size="sm" onChange={handleChange} className="w-75 text-secondary" defaultValue={completedValue}>
                                <option value="to-do">To-Do</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </div>
                        <Button onClick={handleConfirmDelete} className="btn-link text-danger mt-auto mb-1">Remove</Button>
                        <DeleteConfirmation showModal={show} handleClose={handleClose} handleDelete={handleDelete} />
                    </>
                    :
                    <div className="justify-content-center d-flex mt-auto mb-4">
                        <Button variant="primary" className="text-white" onClick={handleAddClick}>Add to Collection</Button>
                    </div>
                    }
                </>
                }
            </Card>
        </Col>
    );

}


export default CollectionCard;