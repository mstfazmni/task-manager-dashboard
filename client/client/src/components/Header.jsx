import React, {useState, useEffect} from "react";
import './Header.css'
import myLogo from '../asset/mz-f-w.png';
import userLogoPng from '../asset/user.png';
import userLogoGif from '../asset/user.gif';
import {Link, useLocation} from 'react-router-dom';
// import mailLogo from '../asset/Contact-me.png'

const Header = ({onLogout, isAuthenticated, user }) => {

    // To handle showing user info right after getting logged-in
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUserInfo(JSON.parse(savedUser));
        }
    }, []);


  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // Get the current location (URL path)
  const location = useLocation();
  
  const toggleUserPopup = () => {
    setIsPopupVisible(!isPopupVisible); 
  };

  const showUserIcon = isAuthenticated && location.pathname === "/dashboard";

    return(
        <div className="header-div-container">
            <div className="logo-left">
                <Link to={'/'}>
                 <img src={myLogo} className="logo-icon" alt="logo"/>
                </Link>
            </div>
    {/* ===================================================================== */}
            <div className="right-icons">
            {showUserIcon && (
                    <div>
                        <img
                            src={userLogoPng}
                            // Trigger popup visibility
                            onClick={toggleUserPopup} 
                            className="user-icon"
                            alt="user"
                        />
                    </div>
                )}

                {isPopupVisible && isAuthenticated && (
                    <div className={`user-info ${isPopupVisible ? 'visible' : ''}`}>
                        <div className="user-name">{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Loading...'}</div>
                        <div className="user-email">{userInfo ? userInfo.email : 'Loading...'}</div>
                        <button className="logout-btn-header" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                )}
                </div>
              </div>
    );
}

export default Header;