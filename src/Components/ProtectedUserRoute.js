import React, {useState} from "react";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedUserRoute({currentUser}) {

    
    
             
    return (
        currentUser ? <Outlet /> : <Navigate to='/' replace state={{redirectMessage: "You will need to login or create an account to access this page"}} />
    )

};

export default ProtectedUserRoute;