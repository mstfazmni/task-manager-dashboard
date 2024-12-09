import React from "react";
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-container">
                <h1>Get in Touch</h1>
                <p>Feel free to reach out for inquiries or collaborations. I look forward to connecting with you!</p>
                <div className="my-info-container">
                    <p><strong>Email:</strong> <a href="mailto:zmnimstfa@gmail.com">zmnimstfa@gmail.com</a></p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/mstfazmni" target="_blank" rel="noopener noreferrer">https://github.com/mstfazmni</a></p>
                    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mo-zamani" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/mo-zamani</a></p>
                </div>
            </div>
        </div>
    )
}

export default Contact;
