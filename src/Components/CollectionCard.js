import React, {useState, useEffect} from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import projectPlaceholder from "../images/projectPlaceholder.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorMessages from "./ErrorMessages";
import DeleteConfirmation from "./DeleteConfirmation";


function CollectionCard({completedStatus, project, setCollectionFilter, setReRender, reRender}) {

   
   
    const [errors, setErrors] = useState(null)
    const [completedValue, setCompletedValue] = useState(completedStatus)
    const [userProjectId, setUserProjectId] = useState(null);
  
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    
    // confirms if project is currently in collection
    useEffect( () => {
        fetch(`/check_in_collection/${project.id}`)
        .then(r => r.json())
        .then(json => {
            if (json.user_project_id !== null) {
                setUserProjectId(json.user_project_id)
            } else {
                setUserProjectId(null)
            }
        })
        .catch(() => setErrors(["There has been an error"]))
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
        .then(r => r.json())
        .then(json => {
            if (json.errors) {
                setErrors(json.errors)
            } else {
                setErrors(null)
                setCompletedValue(() => newStatus)
                setCollectionFilter(newStatus)
            };
        })
        .catch(() => setErrors(["Unable to update collection at this time"]))
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
                setErrors(null)
            } else {
                setErrors(["Unable to remove project from your collection at this time"])
            }
        })
        .catch(() => setErrors(["Unable to remove project from your collection at this time"]))
    }

    // renders confirm delete modal
    function handleConfirmDelete() {
        setShow(true);
    }

    // adds nproject to users collection
    function handleAddClick() {
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
                setUserProjectId(json.id)
            };
        })
        .catch( () => setErrors(["Could not add project to your collection"]))
    }
    
    

    return (
        <Col>
            {errors ? 
            <ErrorMessages errors={errors} />
            :
            <Card>
                <Link to={`/projects/${project.id}`} state={{from: "Collection"}} className="text-decoration-none">
                    <Card.Img variant="top" src={project.image || projectPlaceholder} alt={project.title} />
                    <Card.Body>
                        <Card.Text className="text-secondary text-capitalize text-strong">{project.title}</Card.Text>
                    </Card.Body>
                </Link>
                {userProjectId ?
                <>
                    <div className="justify-content-center d-flex mt-auto">
                        <Form.Select size="sm" onChange={handleChange} className="w-50 text-secondary" defaultValue={completedValue}>
                            <option value="wish list">Wish List</option>
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
            </Card>
            }
        </Col>
    );

}


export default CollectionCard;