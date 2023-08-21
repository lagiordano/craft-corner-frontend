
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
import AccountInformation from './AccountInformation';
import ProtectedAccountRoute from './ProtectedAccountRoute';
import PageNotFound from './PageNotFound';
import FallbackComponent from './FallbackComponent.js';
import { ErrorBoundary } from 'react-error-boundary';
import TermsAndConditions from './TermsAndConditions';

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
        setIsLoading(false)
        setCurrentUser(null)
      };
    })

  }, [])

 


  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Router>
        <div id="wrapper">
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
            <Route exact path="/projects" element={<Projects currentUser={currentUser} />} />
            <Route exact path="/projects/:id" element={<Project currentUser={currentUser} />} />
            <Route exact path="/privacypolicyt&cs" element={<TermsAndConditions /> } />
          {isLoading ? 
          null 
          :
          <>
          <Route element={<ProtectedVisitorRoute currentUser={currentUser}/>}>
            <Route exact path="/" element={<Home setCurrentUser={setCurrentUser} />} />
            <Route exact path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
            <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          </Route>
          <Route element={<ProtectedUserRoute currentUser={currentUser} isLoading={isLoading}/> } >
            <Route exact path="/dashboard" element={<Dashboard currentUser={currentUser}/> } />
            <Route exact path="/projects/addproject" element={<AddProject />} />
            <Route exact path="/projects/:id/editproject" element={<EditProject />} />
          </Route>
          <Route element={<ProtectedAccountRoute currentUser={currentUser} />} >
            <Route exact path="/account" element={<AccountInformation currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          </Route>
          </>
          }
          <Route path="*" element={<PageNotFound currentUser={currentUser} />} />
        </Routes>
        <Footer /> 
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
