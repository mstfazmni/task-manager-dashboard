import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = ({onFlip, setRedirectToDashboard }) => {
    // State for storing form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validation functions
    const validateName = (name) => name.length >= 3 && name.length <= 50;
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 8;
    
    // Handle input changes
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event)=>{
        setLastName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setPassword(event.target.value);
    }

    //handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        //client-side validation
        const newErrors = {};
        if(!validateName(firstName)) newErrors.firstName = "First name must be between 3 and 50 characters";
        if(!validateName(lastName)) newErrors.lastName = "Last name must be between 3 and 50 characters";
        if(!validateEmail(email)) newErrors.email = "Please enter a valid email address";
        if(!validatePassword(password)) newErrors.password = "Password must be at least 8 characters";
        if(!validatePassword(phone)) newErrors.phone = "Enter your phone number please";

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({}); // Clear errors if validation passes

        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        };

        try{
            const response = await fetch('https://task-management-backend-ky4v.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful', data);
                alert('Registration successful');  
                // Trigger redirection to dashboard after successful registration
                setRedirectToDashboard(true);
 
            }else{
                const errorData = await response.json();
                console.log('Registration failed', errorData);
                setErrors({server: errorData.message}); // Show server error
            }
        } catch (error) {
            console.error('Error registering', error);
            setErrors({server: "Something went wrong. Please try again."});
        }
    }



    return(
        <div className="register-container">
        <form className="needs-validation form-register-container" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="validationCustom01">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                    {/* Error handling for first name */}
                        {errors.lastName && <small className="text-danger d-block">{errors.lastName}</small>}

                    <label htmlFor="validationCustom02">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                  
                    {/* Error handling for last name */}
                        {errors.firstName && <small className="text-danger d-block">{errors.firstName}</small>}  

                    <label htmlFor="validationCustom02">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />                
                    {/* Error handling for last name */}
                    {errors.phone && <small className="text-danger d-block">{errors.phone}</small>}    
                </div>
    
                <div className="col-md-12 mb-3">
                    <label htmlFor="validationCustomUsername">Email</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                        </div>
                        <input
                            type="email"
                            className="form-control"
                            id="validationCustomUsername"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
            </div>
    
            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="validationCustom03">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="validationCustom03"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
            </div>
    
            <button className="btn btn-primary" type="submit">
                Create Account
            </button>
            {errors.server && <small className="text-danger">{errors.server}</small>}
    
            <p>
                Already have an account?{" "}
                <span onClick={onFlip} className="login-link">
                    Log In
                </span>
            </p>
        </form>
    </div>
    
    );
};

export default Register;