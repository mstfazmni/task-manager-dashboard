import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthContainer.css";
import { Navigate } from "react-router-dom";

const AuthContainer = ({setIsAuthenticated }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleLoginSuccess = (token, user) => {

        // Store the token and user in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Update authentication state
        setIsAuthenticated(true);  
        // Trigger redirection
        setRedirectToDashboard(true);  
    };

    if (redirectToDashboard) {
        // Redirect to dashboard after registration or login success
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className={`auth-container ${isFlipped ? "flipped" : ""}`}>
            <div className="auth-card">
                <div className="auth-face auth-login">
                    {/* Pass onFlip and handleLoginSuccess to Login */}
                    <Login onFlip={handleFlip} onLoginSuccess={handleLoginSuccess} /> 
                </div>
                <div className="auth-face auth-register">
                    {/* Pass onFlip and setRedirectToDashboard  to Register */}
                    <Register onFlip={handleFlip} setRedirectToDashboard={setRedirectToDashboard} /> 
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;
