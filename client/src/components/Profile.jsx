import React, {useEffect, useState} from "react";
import './Profile.css';
import userImg from '../asset/user-img.png';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    //retrive user info
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if(savedUser){
            setUserInfo(JSON.parse(savedUser));
        }
    },[]);

    //Navigate button to main page
    const navigate = useNavigate();
    const handleNavigateDashboardClick = () => {
        navigate('/dashboard');
    }

    return(
        <div className="profile-container">
            {/* section 1 */}
            <section className="user-pic-left">

                <img src={userImg} className="user-img" alt="userimage"></img>
                <p className="user-name-div">{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Loading...'}</p>
                <p className="user-job">Software Developer</p>
                <button className="navigateBtn" onClick={handleNavigateDashboardClick}>Back To Dashboard</button>
            </section>
            {/* section 2 */}
            <section className="user-info-right">

                <div className="user-contact-info">
                    <h2>Information</h2>
                    <div className="contact-container-profile">
                        <p className="user-email-info">Email: {userInfo ? `${userInfo.email}` : 'Loading...'}</p>
                        <p className="user-phone-info">Phone: {userInfo ? `${userInfo.phone}`: 'Loading...'} </p>
                    </div>
                </div>

                <div className="user-projects">
                    <h2>Projects</h2>
                    <div className="user-projects-container">
                        <p className="recent-project">Recent</p>
                        <p className="most-viewed">Most viewed</p>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Profile;