import React, {useState, useEffect} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

    const { state } = useLocation();
    
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
        setIsLoading(true);

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginDetails.email.toLowerCase(),
                password: loginDetails.password
            })
        })
        .then(r => {
            if (r.ok) {
                setErrors(null);
                r.json().then(json => setCurrentUser(json))
                .then(() => {
                    if (state) {
                        navigate(state.location)
                    } else {
                        navigate("/dashboard")
                    };
                })
            } else {
                r.json()
                .then(json => {
                    setIsLoading(false)
                    json.errors ? setErrors(json.errors) : setErrors(["Could not log you in"])
                })
            }
        })
        .catch(() => setErrors(["Could not log you in"]))
    };

    return (
        <Container id="login" className="mt-4 mt-md-5">
            <div className="bg-white text-secondary border-primary border rounded text-start my-3 my-md-4 m-lg-5 p-2 p-md-3 px-lg-4">
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
                    <Button type="submit" variant="primary" disabled={isLoading} className="text-white mt-3 ms-2">Login</Button>
                    <p className="pt-3 px-2">Don't have an account yet? Create one <Link to="/signup">here</Link></p>
                </Form>
            </div>
        </Container>
    )
}


export default Login;