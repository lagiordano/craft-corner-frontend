
import './App.css';
import React, {useEffect, useState} from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Projects from './Components/Projects';
import Project from './Components/Project';
import AddProject from './Components/AddProject';
import Dashboard from './Components/Dashboard';

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect( () => {
    fetch("http://localhost:3000/me")
    .then(r => {
      if (r.ok) {
        r.json().then(user => console.log(user))
      } else {
        alert("send to log in page once set up")
      };
    })
  }, []);

  



  return (
    <>
      <NavBar/>
      <Routes>
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
