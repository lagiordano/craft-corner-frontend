import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import UnauthorizedModal from "./UnauthorizedModal";
import { Button } from "react-bootstrap";

function Home() {

    const [projectSample, setProjectSample] = useState([]);
    const [hasError, setHasError] = useState(false);
    const { state } = useLocation();

   const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

    useEffect( () => {
        document.title = "Craft Corner";
        document.body.style = 'background: rgb(250,223,223);';
        localStorage.clear();
    }, [])

    useEffect(() => {
        if (state) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [])


    useEffect( () => {
        fetch("/popular_sample")
        .then(r => {
            if (r.ok) {
                r.json().then(json => setProjectSample(json))
                setHasError(false);
            } else {
                setHasError(true);
            };
        })
        .catch(() => setHasError(true));
    }, []);

    return (
        <>
        <Container className="text-secondary my-2 my-md-3 mt-lg-5 mb-lg-3 py-2">
            <UnauthorizedModal showModal={show} handleClose={handleClose} state={state}/>
            <Row className="d-flex align-items-center">
                <Col sm={12} lg={6}>
                    <h1 className="p-2">Welcome to Craft Corner!</h1>
                    <h5 className="p-2">In need of some extra inspo? Always forgetting your next project idea?</h5>
                    <h5 className="p-2">It's time to get crafty!</h5>
                    {/* <Row md={3} className="g-4 px-3 py-2 p-md-3 d-none d-md-flex justify-content-center">
                        <Col>
                            <Link to="/projects">
                                <Card className="text-primary border-primary bg-white home-card">
                                    <Card.Body className="d-flex align-items-center justify-content-center">View Projects</Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/signup">
                                <Card className="text-primary border-primary bg-white home-card">
                                    <Card.Body className="d-flex align-items-center justify-content-center ">Signup</Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/login">
                                <Card className="text-primary border-primary bg-white home-card">
                                    <Card.Body className="d-flex align-items-center justify-content-center">Login</Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    </Row> */}
                </Col>
                <Col sm={12} lg={6} >
                    <div className="bg-white rounded border border-primary p-3 p-lg-4 m-2 mx-lg-5 text-start">
                        <h6 className="text-center">What can I do on Craft Corner?</h6>
                        <ul className="mb-0">
                            <li>Browse projects shared by other users</li>
                            <li>Save projects shared by others to your wish list</li>
                            <li>Keep track of all your projects currently on the go</li>
                            <li>Easily add new projects from blogs, social media, or your imagination</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
        <div id="home_projects" className={hasError ? "d-none" : "bg-white mt-3 pt-3 pb-4"}>
            <Container>
                <h3 className="text-secondary p-2">Start by exploring some of our popular projects...</h3>
                <Row xs={1} md={2} lg={4} className="g-4 p-2">
                    {projectSample.map(project => <ProjectCard key={project.id} image={project.image} title={project.title} id={project.id} />)}
                </Row>
            </Container>
        </div>
        </>
            

    )
    

}


export default Home;