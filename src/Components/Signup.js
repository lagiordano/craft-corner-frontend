import React, {useState, useEffect} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PasswordChecklist from "react-password-checklist";

function Signup({setCurrentUser}) {
    const [signupDetails, setSignupDetails] = useState({
        username: "",
        email: "",
        password: "", 
        passwordConfirmation: ""
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { state } = useLocation();

    useEffect( () => {
        document.title = "Craft Corner | Create Account";
        document.body.style = 'background: rgb(250,223,223);';
    }, [])

    function handleSignupChange(e) {
        const name = e.target.name
        const value = e.target.value
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: signupDetails.username,
                email: signupDetails.email.toLowerCase(),
                password: signupDetails.password, 
                password_confirmation: signupDetails.passwordConfirmation
            })
        })
        .then(r => {
            setIsLoading(false)
            if (r.ok) {
                r.json()
                .then(json => setCurrentUser(json))
                .then(() => {
                    if (state) {
                        navigate(state.location)
                    } else {
                        navigate("/dashboard")
                    };
                })
            } else {
                r.json().then(json => json.errors ? setErrors(json.errors) : setErrors(["Could not create account"]))
            }
        })
        .catch(() => setErrors(["Could not create account"]))
    }

    return (
        <Container id="signup" >
                <div className="bg-white my-3 my-md-4 m-lg-5 p-2 p-md-3 px-lg-4 text-secondary border-muted border rounded text-start">
                    <h1 className="text-center p-2">Create an Account</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="p-2">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control required type="text" name="username" value={signupDetails.username} onChange={handleSignupChange} placeholder="Enter username..."/>
                            <Form.Text className="text-light">This will appear on projects that you add to Craft Corner</Form.Text>
                        </Form.Group>
                        <Form.Group className="p-2">
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control required type="email" name="email" value={signupDetails.email} onChange={handleSignupChange} placeholder="Enter email..."/>
                            <Form.Text className="text-light">This will not be shared with anyone else</Form.Text>
                        </Form.Group>
                        <Form.Group className="p-2">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control required type="password" name="password" value={signupDetails.password} onChange={handleSignupChange} placeholder="Enter password..."/>
                            <Form.Text className="text-light">Your password must be at least 8 characters long and contain at least: 1 uppercase letter, 1 lowercase letter, 1 number</Form.Text>
                        </Form.Group>
                        <Form.Group className="p-2">
                            <Form.Label>Password Confirmation:</Form.Label>
                            <Form.Control required type="password" name="passwordConfirmation" value={signupDetails.passwordConfirmation} onChange={handleSignupChange} placeholder="Confirm Password..." />
                        </Form.Group>
                        <PasswordChecklist
                            rules={["minLength", "capital", "lowercase","number", "match"]}
                            minLength={8}
                            value={signupDetails.password}
                            valueAgain={signupDetails.passwordConfirmation}
                            className="ps-2 pb-1"
                            messages={{
                                minLength: "Must be at least 8 characters",
                                capital: "Must contain at least one uppercase letter",
                                lowercase: "Must contian at least one lowercase letter",
                                number: "Must contain at least one number",
                                match: "Password must match password confirmation"
                            }}
                        />
                        {errors ?
                        <div className="text-danger pt-2 px-2">
                            Unable to create account:
                            <ul>
                                {errors.map(error => <li>{error}</li>)}
                            </ul>
                        </div>
                        :
                        null}
                        <Form.Group className="pt-2">
                            <Form.Label>Please read our <Link to="/privacypolicyt&cs" target="_blank" rel="noreferrer">Privacy Policy and T&C's</Link> before proceeding:</Form.Label>
                            <Form.Check required type="checkbox" label="I have read Craft Corner's privacy policy and agree to the terms and conditions" />
                        </Form.Group>
                        <Button type="submit" variant="primary" disabled={isLoading} className="text-white mt-3 ms-2">Create Account</Button>
                        <p className="pt-4 px-2">Already have an account? Log in <Link to="/login">here</Link></p>
                    </Form>
                </div>
            </Container>
    )


}


export default Signup;