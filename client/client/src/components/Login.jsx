import React, { useState } from "react";
import './Login.css';

const Login = ({ onFlip, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSampleLogin = () => {
        setEmail('sample@example.com');
        setPassword('password');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('Please wait. This may take a few seconds.');

        const payload = { email, password };

        try {
            const response = await fetch('https://task-management-backend-ky4v.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // alert("Login successful");
                onLoginSuccess(data.token, data.user);
            } else {
                const errorData = await response.json();
                setMessage('Login failed, please try again.');
                console.log('Login failed', errorData);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-full-container">
            <section className="info-container">
                <p className="p-info-login">
                    I'm a passionate web development student at Bow Valley College, set to graduate in May,
                    with a strong foundation in React, Node.js, MongoDB, and TypeScript. I'm also skilled in C# and .NET,
                    where I’ve worked on Windows application development using Object-Oriented Programming (OOP) principles.
                    Proficient with Git and GitHub, I use these tools daily to manage codebases and collaborate effectively.
                    My go-to environments are VS Code and Visual Studio, where I build, debug, and refine high-quality applications.
                    I thrive on solving complex problems, writing clean and efficient code,
                    and continuously expanding my expertise in modern development tools and frameworks.
                </p>
            </section>
            <section className="form-login-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-6 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">E-mail</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">@</div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inlineFormInputGroupUsername"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inlineFormInputPassword"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="col-auto my-1">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </div>
                    <button type="button" className="btn btn-secondary my-2" onClick={handleSampleLogin}>
                        Use Sample Login
                    </button>
                    {message && <p className="login-message">{message}</p>}
                    <p>
                        Don’t have an account?{" "}
                        <span onClick={onFlip} className="signup-link">
                            Sign Up
                        </span>
                    </p>
                </form>
            </section>
        </div>
    );
};

export default Login;
