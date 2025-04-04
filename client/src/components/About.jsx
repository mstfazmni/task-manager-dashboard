import React from "react";
import './About.css';
import myPicture from '../asset/me-img.png';
import { useNavigate } from 'react-router-dom';

const About = () => {

    //Navigate button to main page
        const navigate = useNavigate();
        const handleNavigateDashboardClick = () => {
            navigate('/dashboard');
        }

    return (
        <div className="about-page">
            <div className="full-about-container">
                <h1 className="h1-div">ABOUT ME</h1>
                <div className="about-container">
                    
                    <p className="p-info">
                        I'm a passionate web development student at Bow Valley College, set to graduate in May,
                        with a strong foundation in React, Node.js, MongoDB, and TypeScript. I'm also skilled in C# and .NET,
                        where I’ve worked on Windows application development using Object-Oriented Programming (OOP) principles.
                        Proficient with Git and GitHub, I use these tools daily to manage codebases and collaborate effectively.
                        My go-to environments are VS Code and Visual Studio, where I build, debug, and refine high-quality applications.
                        I thrive on solving complex problems, writing clean and efficient code,
                        and continuously expanding my expertise in modern development tools and frameworks.
                    </p>
                </div>
                <button className="navigateBtn3" onClick={handleNavigateDashboardClick}>Back To Dashboard</button>
            </div>
        </div>
    );
};

export default About;
