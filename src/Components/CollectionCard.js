import React, {useState} from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import projectPlaceholder from "../images/projectPlaceholder.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorMessages from "./ErrorMessages";
import DeleteConfirmation from "./DeleteConfirmation";


function CollectionCard({completedStatus, userProjectID, project, setCompletedStatus, setProjectRemoved}) {

   
    const [errors, setErrors] = useState(null)
    const [completedValue, setCompletedValue] = useState(completedStatus)
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    
    

    function handleChange(e) {
        const newStatus = e.target.value
        fetch(`http://localhost:3000/user_projects/${userProjectID}`, {
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
                setCompletedStatus(newStatus)
            };
        })
        .catch(() => setErrors(["Unable to update collection at this time"]))
    }

    function handleDelete() {
        fetch(`http://localhost:3000/user_projects/${userProjectID}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.ok) {
                setProjectRemoved(true)
                setErrors(null)
            } else {
                setErrors(["Unable to remove project from your collection at this time"])
            }
        })
        .catch(() => setErrors(["Unable to remove project from your collection at this time"]))
    }

    function handleClickDelete() {
        setShow(true);
    }


    return (
        <Col>
            {errors ? <ErrorMessages errors={errors} />
            :
            <Card>
                <Link to={`/projects/${project.id}`} className="text-decoration-none">
                    <Card.Img variant="top" src={project.image || projectPlaceholder} alt={project.title} />
                    <Card.Body>
                        <Card.Text className="text-secondary text-capitalize text-strong">{project.title}</Card.Text>
                    </Card.Body>
                </Link>
                    <div className="justify-content-center d-flex mt-auto">
                        <Form.Select size="sm" onChange={handleChange} className="w-50 text-secondary" defaultValue={completedValue}>
                            <option value="wish list">Wish List</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </Form.Select>
                        </div>
                    <Button onClick={handleClickDelete} className="btn-link text-danger mt-auto">Remove from collection</Button>
                    <DeleteConfirmation showModal={show} handleClose={handleClose} handleDelete={handleDelete} />
            </Card>
            }
        </Col>
    );

}


export default CollectionCard;