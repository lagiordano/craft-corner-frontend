import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedVisitorRoute({currentUser}){

    return (
        currentUser ? <Navigate to="/dashboard" /> : <Outlet />
    );

}

export default ProtectedVisitorRoute;