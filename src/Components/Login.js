import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login({setCurrentUser}) {

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect( () => {
        document.title = "Craft Corner | Login";
        document.body.style = 'background: rgb(250,223,223);';
    }, [])

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setLoginDetails({
            ...loginDetails, 
            [name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDetails)
        })
        .then(r => {
            setIsLoading(false)
            if (r.ok) {
                r.json()
                .then(json => setCurrentUser(json))
                .then(() => console.log("logged in"))
                .then(() => navigate("/dashboard"))
            } else {
                r.json()
                .then(json => setErrors(json.errors))
            }
        })
    };

    return (
        <Container id="login" className="mt-4 mt-md-5">
            <div className="bg-white text-secondary border-primary border rounded text-start my-3 my-md-4 m-lg-5 p-2 p-md-3 p-lg-4">
                <h1 className="text-center p-2">Login to Account</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="p-2">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" required name="email" value={loginDetails.email} onChange={handleChange} placeholder="Enter email..."/>
                    </Form.Group>
                    <Form.Group className="p-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" required name="password" value={loginDetails.password} placeholder="Enter password..." onChange={handleChange} />
                    </Form.Group>
                    { errors ? 
                    <div className="text-danger pt-2 px-2">
                        Unable to login:
                        <ul>
                            {errors.map(error => <li>{error}</li>)}
                        </ul>
                    </div>
                    :
                    null}
                    <Button type="submit" variant="primary" disabled={isLoading} className="text-white m-2">Login</Button>
                </Form>
            </div>
        </Container>
    )
}


export default Login;