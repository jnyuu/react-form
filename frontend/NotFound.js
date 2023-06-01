import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Navigate } from "react-router-dom";

const NotFound = () => {
    return <Navigate to="/login-form" replace />;
};

export default NotFound;