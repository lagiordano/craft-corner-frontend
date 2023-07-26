
import '../App.css';
import React, {useEffect, useState} from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import Projects from './Projects';
import Project from './Project';
import AddProject from './AddProject';
import Dashboard from './Dashboard';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  // auto log in 
  useEffect( () => {
    fetch("/me")
    .then(r => {
      if (r.ok) {
        r.json()
        .then(user => setCurrentUser(user))
        .then(() => console.log(currentUser))
      } else {
        r.json()
        .then(json => console.log(json.errors))
      };
    })

  }, []);

 


  return (
    <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
        <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project currentUser={currentUser} />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/projects/addproject" element={<AddProject />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
