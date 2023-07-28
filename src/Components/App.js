
import '../App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import Projects from './Projects';
import Project from './Project';
import AddProject from './AddProject';
import Dashboard from './Dashboard';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import ProtectedUserRoute from './ProtectedUserRoute';
import ProtectedVisitorRoute from './ProtectedVisitorRoute';
import EditProject from './EditProject';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // auto log in 
  useEffect( () => {
    fetch("/me")
    .then(r => {
      if (r.ok) {
        r.json()
        .then(user => {
          setCurrentUser(user)
          setIsLoading(false)
        })

      } else {
        r.json()
        .then(json => {
          setIsLoading(false)
          console.log(json.errors)
        })
      };
    })

  }, [])

 


  return (
    <Router>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route exact path="/projects" element={<Projects currentUser={currentUser} />} />
        <Route exact path="/projects/:id" element={<Project currentUser={currentUser} />} />
        {isLoading ? 
        null 
        :
        <>
        <Route element={<ProtectedVisitorRoute currentUser={currentUser} />}>
          <Route exact path="/" element={<Home setCurrentUser={setCurrentUser} />} />
          <Route exact path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
          <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        </Route>
        <Route element={<ProtectedUserRoute currentUser={currentUser} isLoading={isLoading}/> } >
          <Route exact path="/dashboard" element={<Dashboard currentUser={currentUser}/> } />
          <Route exact path="/projects/addproject" element={<AddProject />} />
          <Route exact path="/projects/:id/editproject" element={<EditProject />} />
        </Route>
        </>
        }
        <Route path="*" element={<h3>Whoops, looks like there isn't a page at this url</h3>} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
