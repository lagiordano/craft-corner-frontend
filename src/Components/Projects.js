import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectFilter from "./ProjectFilter";
import ProjectCard from "./ProjectCard";
import ErrorMessages from "./ErrorMessages";


function Projects() {

    useEffect( () => {
        document.title = "Craft Corner | Shared Projects";
        document.body.style = 'background: white;';
        localStorage.clear();
    }, [])

    const storedSearch = localStorage.getItem('projectsSearch');
    const storedSelect = localStorage.getItem('projectsSelect');
    
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState(storedSearch || "")
    const [select, setSelect] = useState(storedSelect || "all")
    const [errors, setErrors] = useState(null)


    useEffect( () => {
        fetch("/projects")
        .then(r => {
            if (r.ok) {
                r.json().then(json => {
                    setErrors(null);
                    setProjects(json)
                })
            } else {
                r.json().then(json => console.log(json))
                setErrors(["Unable to load project information at this time"]);
            };
        })
    }, []);



    useEffect( () => {
        localStorage.setItem('projectsSelect', select)
    }, [select])

    useEffect( () => {
        localStorage.setItem('projectsSearch', search)
    }, [search])

    

    const filteredProjects = projects.filter( project => {
        if (select === "all") return true;
        return project.category === select;
    });

    const projectsToDisplay = filteredProjects.filter( project => project.title.toLowerCase().includes(search.toLowerCase()));


    return (
        <>
        <Row className="py-4 my-2 bg-warning text-secondary">
            <Col>
                <h3>Projects Shared by Our Community</h3>
            </Col>
        </Row>
        <Container>
            <Row className="justify-content-center d-flex">
                <ProjectFilter search={search} setSearch={setSearch} select={select} setSelect={setSelect}/>
            </Row>
        </Container>
        {errors ?
        <ErrorMessages errors={errors} />
        :
        <Container className="mb-5">
                {(projectsToDisplay.length === 0) ? 
                <div className="text-secondary fs-5">Looks like there are no project matching your search. Try changing categories or trying a different search term.</div>
                :
                <Row xs={1} sm={2} md={3} xl={4} className="g-4 mx-2 justify-content-center d-flex">
                    {projectsToDisplay.map( project => <ProjectCard image={project.image} title={project.title} id={project.id} key={project.id}/>)}
                </Row>
                }
        </Container>
        }
        </>
    );
};


export default Projects;

