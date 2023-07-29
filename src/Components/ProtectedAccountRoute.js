import React from "react";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedAccountRoute({currentUser}) {
    
   
             
    return (
        currentUser ? <Outlet /> : <Navigate to='/' />
    )

};

export default ProtectedAccountRoute;