import React from "react";
import './Contact.css';
import gitLogo from '../asset/github.png';
import linkedLogo from '../asset/linkedin.png';
import { useNavigate } from 'react-router-dom';



const Contact = () => {

  //Navigate button to main page
  const navigate = useNavigate();
      const handleNavigateDashboardClick = () => {
          navigate('/dashboard');
      }

  return (
      <div className="contact-container">
        <div className="contact-wrapper">
          <section className="contact-left-sec">
              <h1 className="h1-contact">GET IN</h1>
              <span className="span-contact">touch</span>
              <div className="left-sec-inside-container">

                <div className="input-container">
                    <input type="text" placeholder="Your name"/>
                    <input type="email" placeholder="Your email address"/>
                </div>
                
                <div className="action-container">
                    <textarea placeholder="Write to me..."></textarea>
                    <button className="submit-btn">Submit</button>
                    
                </div>
                
              </div>

              <div className="logos-email-container">
                  <div className="logos-div">
                      <a href="https://github.com/mstfazmni" target="_blank" rel="noopener noreferrer">
                        <img src={gitLogo} alt="GitHub" className="git-logo" />
                      </a>
                      <a href="https://www.linkedin.com/in/mo-zamani" target="_blank" rel="noopener noreferrer">
                        <img src={linkedLogo} alt="LinkedIn" className="linked-logo" />
                      </a>
                  </div>
                  <div className="email-div">
                    <p>You can also email me</p>
                    <a href="mailto:zmnimstfa@gmail.com">zmnimstfa@gmail.com</a>
                  </div>
                  
              </div>
              <button className="navigateBtn2" onClick={handleNavigateDashboardClick}>Back To Dashboard</button>
          </section>   
        </div>  
      </div>
  );
}

export default Contact;
