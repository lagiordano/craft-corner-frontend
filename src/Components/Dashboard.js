import React, {useState, useEffect} from "react";
import ErrorMessages from "./ErrorMessages";
import ProjectFilter from "./ProjectFilter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CollectionCard from "./CollectionCard";

function Dashboard() {

    useEffect( () => {
        document.title = "Craft Corner | Your Collection";
        document.body.style = 'background: white;';
    }, [])

    const [collection, setCollection] = useState([]);
    const [completedStatus, setCompletedStatus] = useState("in progress");
    const [projectRemoved, setProjectRemoved] = useState(false)
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("all");

    useEffect( () => {
        fetch(`http://localhost:3000/collection/${completedStatus}`)
        .then(r => r.json())
        .then(json => {
            setCollection(json)
            setErrors(null)
            setProjectRemoved(false)
        })
        .catch(() => setErrors(["There has been an issue loading your project information"]))
    }, [completedStatus, projectRemoved])


    function handleCollectionClick(e) {
        setCompletedStatus(e.target.value)
    };

    function handleSharedByMeClick() {
        // work on this after user auth implemented
    }


    const filteredProjects = collection.filter( item => {
        if (select === "all") return true;
        return item.project.category === select;
    });

    const projectsToDisplay = filteredProjects.filter( item => item.project.title.toLowerCase().includes(search.toLowerCase()));
    
   

    return (
        <>
        <Row className="py-4 my-2 bg-warning text-secondary">
            <Col sm={12} md={4} className="d-flex justify-content-center">
                <h2 className="mb-4 mb-md-0 ms-lg-5">Your Collection</h2>
            </Col>
            <Col sm={12} md={8} className="d-flex justify-content-evenly">
                <Button variant="outline-secondary" size="sm" className="px-3" onClick={handleCollectionClick} value="all">All</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionClick} value="in progress">In Progress</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionClick} value="completed">Completed</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionClick} value="wish list">Wish List</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleSharedByMeClick} >Shared By Me</Button>
            </Col>
        </Row>
        <Container>
            <Row className="justify-content-center d-flex">
                <ProjectFilter search={search} setSearch={setSearch} select={select} setSelect={setSelect}/>
            </Row>
        </Container>
        <Container className="mb-5 mt-2">
            {errors ? <ErrorMessages errors={errors} />
            :
            <>
                {(projectsToDisplay.length === 0) ? 
                <div className="text-secondary fs-5">Looks like there are no project matching your search. Try changing categories or trying a different search term.</div>
                :
                <Row xs={1} sm={2} md={3} xl={4} className="g-4 mx-2 justify-content-center d-flex">
                    {projectsToDisplay.map( item => <CollectionCard project={item.project} completedStatus={item.completed_status} userProjectID={item.id} key={item.id} setCompletedStatus={setCompletedStatus} setProjectRemoved={setProjectRemoved}/>)}
                </Row>
                }
            </>
            }
        </Container>
        </>
    )
    
}

export default Dashboard;