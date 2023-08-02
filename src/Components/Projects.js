import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectFilter from "./ProjectFilter";
import ProjectCard from "./ProjectCard";
import ErrorMessages from "./ErrorMessages";
import Button from "react-bootstrap/Button";
import PaginationComponent from "./PaginationComponent";


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
                setErrors(["Unable to load projects at this time"]);
            };
        })
        .catch(() => setErrors(["Unable to load projects at this time"]))
    }, []);

    const filteredProjects = projects.filter( project => {
        if (select === "all") return true;
        return project.category === select;
    });

    const projectsToDisplay = filteredProjects.filter( project => project.title.toLowerCase().includes(search.toLowerCase()));


     // pagination 
     const [currentPage, setCurrentPage] = useState(1);
     const projectsPerPage = 12;
     const indexOfLastProject = currentPage * projectsPerPage;
     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
     const currentProjects = projectsToDisplay.slice(indexOfFirstProject, indexOfLastProject);
     const nPages = Math.ceil(projectsToDisplay.length / projectsPerPage)


    useEffect( () => {
        localStorage.setItem('projectsSelect', select)
    }, [select])

    useEffect( () => {
        localStorage.setItem('projectsSearch', search)
    }, [search])


    function handleResetClick() {
        setSearch("");
        setSelect("all");
    }
    

    

    return (
        <>
        <Container>
            <Row className="p-4 my-2 bg-warning text-secondary full-width-row">
                <Col>
                    <h3>Projects Shared by Our Community</h3>
                </Col>
            </Row>
            <Row className="justify-content-center d-flex">
                <Col>
                    <ProjectFilter search={search} setSearch={setSearch} select={select} setSelect={setSelect} setCurrentPage={setCurrentPage}/>
                </Col>
            </Row>
        </Container>
        
        {errors ?
        <ErrorMessages errors={errors} />
        :
        <Container className="mb-5">
                {(projectsToDisplay.length === 0) ? 
                <Row className="text-secondary">
                    <h5 className="p-3">Looks like there are no project matching your search</h5>
                    <h5 className="p-3">Try adjusting your filters above or click <Button variant="link" className="m-0 p-0" onClick={handleResetClick}><h5 className="p-0 mb-1">here</h5></Button> to view all projects</h5>
                </Row>
                :
                <>                
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 mx-2 justify-content-center d-flex">
                    {currentProjects.map( project => <ProjectCard image={project.image} title={project.title} id={project.id} key={project.id}/>)}
                </Row>
                <Row className="pt-4 pb-2">
                    <Col className="d-flex justify-content-center">
                        <PaginationComponent nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </Col>
                </Row>
                </>
                }
        </Container>
        }
        </>  
    );
};


export default Projects;

