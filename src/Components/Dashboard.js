import React, {useState, useEffect} from "react";
import ErrorMessages from "./ErrorMessages";
import ProjectFilter from "./ProjectFilter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CollectionCard from "./CollectionCard";
import { Link } from "react-router-dom";

function Dashboard({currentUser}) {

    useEffect( () => {
        document.title = "Craft Corner | Your Collection";
        document.body.style = 'background: white;';
        localStorage.clear();
    }, [])

    const storedSearch = localStorage.getItem('collectionSearch');
    const storedSelect = localStorage.getItem('collectionSelect');
    const storedCollectionFilter = localStorage.getItem('collectionFilter');


    const [collection, setCollection] = useState([]);
    const [collectionFilter, setCollectionFilter] = useState(storedCollectionFilter || "in progress");
    const [reRender, setReRender] = useState(false)
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState(storedSearch || "")
    const [select, setSelect] = useState(storedSelect || "all")


    // Access user collection based on - progress status or shared by me
    useEffect( () => {
        fetch(`/collection/${collectionFilter}`)
        .then(r => { 
            if (r.ok) {
                r.json().then(json => {
                    setCollection(json);
                    setErrors(null);
                });
            } else {
                setErrors(["Unable to load your collection at this time"]);
            };
        })
        .catch(() => setErrors(["Unable to load your collection at this time"]))
    }, [collectionFilter, reRender])


    // manage filter data in local storage
    useEffect( () => {
        localStorage.setItem('collectionFilter', collectionFilter)
    }, [collectionFilter])

    useEffect( () => {
        localStorage.setItem('collectionSelect', select)
    }, [select])

    useEffect( () => {
        localStorage.setItem('collectionSearch', search)
    }, [search])

  
    function handleCollectionFilterClick(e) {
        setCollectionFilter(e.target.value);
        setReRender(!reRender);
    };

    // reset search filters, display all 
    function handleResetClick() {
        setCollectionFilter("all");
        setSearch("");
        setSelect("all");
    }


    // filter projects and find which ones to display 
    const filteredProjects = collection.filter( item => {
        if (select === "all") return true;
        return item.project.category === select;
    });

    const projectsToDisplay = filteredProjects.filter( item => item.project.title.toLowerCase().includes(search.toLowerCase()));
    
   

    return (
        <>
        <Row className="py-4 my-2 bg-warning text-secondary">
            <Col sm={12} md={4} className="d-flex justify-content-center">
                <h2 className="mb-4 mb-md-0 ms-2 ms-lg-4">{currentUser.username}'s Collection</h2>
            </Col>
            <Col sm={12} md={8} className="d-flex justify-content-evenly">
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="in progress" active={collectionFilter === "in progress" ? true : false}>In Progress</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="wish list" active={collectionFilter === "wish list" ? true : false}>Wish List</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="completed" active={collectionFilter === "completed" ? true : false}>Completed</Button>
                <Button variant="outline-secondary" size="sm" className="px-3" onClick={handleCollectionFilterClick} value="all" active={collectionFilter === "all" ? true : false}>All</Button>
                <Button variant="outline-secondary" size="sm" onClick={handleCollectionFilterClick} value="shared by user" active={collectionFilter === "shared by user" ? true : false}>Shared By You</Button>
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
            <Row className={projectsToDisplay.length === 0 ? "text-secondary d-flex justify-content-center" : "d-none"}>
                <Col xs={12} md={10} lg={8}>
                    <h5 className="p-3">We couldn't find any projects in your collection to display.</h5>
                    <h5 className="p-3">Try adjusting your filters above or click <Button variant="link" className="m-0 p-0" onClick={handleResetClick}><h5 className="p-0 mb-1">here</h5></Button> to view all projects in your collection.</h5>
                    <h5 className="p-3">Haven't added any projects yet? No worries! Head over to <Link to="/projects">projects</Link> for inspiration or you can <Link to="/projects/addproject">add a new project</Link> yourself.</h5>
                </Col>
            </Row>
            <Row xs={1} sm={2} md={3} xl={4} className="g-4 mx-2 justify-content-center d-flex">
                {projectsToDisplay.map( item => <CollectionCard project={item.project} completedStatus={item.completed_status} key={item.id} setCollectionFilter={setCollectionFilter} setReRender={setReRender} reRender={reRender} />)}
            </Row>
            </>
            }
        </Container>
        </>
    )
    
}

export default Dashboard;