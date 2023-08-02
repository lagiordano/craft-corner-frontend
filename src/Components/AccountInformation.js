import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DeleteAccountmodal from "./DeleteAccountModal";
import ErrorMessages from "./ErrorMessages";

function AccountInformation ({currentUser, setCurrentUser}) {

    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [formDisabled, setFormDisabled] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    

    useEffect( () => {
        document.title = "Craft Corner | Account Info";
        document.body.style = 'background: rgb(250,223,223);';
    }, [])

    
    function handleUpdateClick() {
        setButtonDisabled(true)
        setFormDisabled(false)
    }

    function handleCancelClick() {
        setErrors(null);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setFormDisabled(true);
        setButtonDisabled(false);
    }

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true);

        fetch(`users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username, 
                email: email
            })
        })
        .then(r => {
            if (r.ok) {
                setFormDisabled(true);
                setIsLoading(false);
                setButtonDisabled(false);
                setErrors(null);
            } else {
                r.json().then(json => {
                    json.errors ? setErrors(json.errors) : setErrors(["Could not update account details at this time"]);
                    setIsLoading(false);
                })
                
            }
        })
        .catch(() => setErrors(["Could not update account details at this time"]))
    }
    
    function handleDelete() {
        setIsLoading(true)

        fetch(`/users/${currentUser.id}`, {
            method: "DELETE"
        })
        .then(r => {
            setShow(false)
            if (r.ok) {
                setCurrentUser(null);
            } else {
                setErrors(["Could not delete account at this time"])
                setIsLoading(false);
            }
        })
        .catch(() => setErrors(["Could not delete account at this time"]))
    }


    return (
        <Container className="text-secondary mt-5">
            <Row className="d-flex justify-content-center mt-5">
                <Col sm={12} md={8} lg={7} className="bg-white rounded border border-primary p-4">
                    <h1 className="p-3 text-decoration-underline">Account Details</h1>
                    <Form onSubmit={handleSubmit} className={formDisabled ? "text-start p-3" : "text-start p-3 my-3 border border-muted rounded"}>
                        <Row className="p-2">
                            <Col sm={12} lg={3}>
                                <Form.Label>Username:</Form.Label>
                            </Col>
                            <Col sm={12} lg={9}>
                                <Form.Control disabled={formDisabled} type="text" value={username} onChange={(e => setUsername(e.target.value))} />
                            </Col>
                        </Row>
                        <Row className="p-2">
                            <Col sm={12} lg={3}>
                                <Form.Label>Email:</Form.Label>
                            </Col>
                            <Col sm={12} lg={9}>
                                <Form.Control disabled={formDisabled} type="email" value={email} onChange={(e => setEmail(e.target.value))} />
                            </Col>
                        </Row>
                        {errors ? 
                        <Row>
                            <ErrorMessages errors={errors} />
                        </Row>
                        :
                        null }
                        <Row className={formDisabled ? "d-none" : "p-2"}>
                            <Col className="d-flex justify-content-end">
                                <Button onClick={handleCancelClick} variant="secondary">Cancel</Button>
                                <Button type="submit" disabled={isLoading} variant="primary" className="text-white ms-2">Save</Button>
                            </Col>
                                
                        </Row>

                    </Form>
                    <Row className="p-2">
                        <Col>
                            <Button variant="primary text-white" disabled={buttonDisabled} className="m-1 ms-md-3 ms-lg-5 my-lg-2" onClick={handleUpdateClick}>Update Details</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-danger" disabled={isLoading} className="m-1 me-md-3 me-lg-5 my-lg-2" onClick={() => setShow(true)}>Delete Account</Button>
                            <DeleteAccountmodal showModal={show} handleClose={handleClose} handleDelete={handleDelete} />
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
            
        </Container>
    )

}


export default AccountInformation;