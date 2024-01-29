import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../context/userProvider';


export default function Navbar (props)  {

  const {logoutUser,getUser} = useContext(UserContext);
  const user = getUser();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark-subtle ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Blogs
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">
                  Home
                </Link>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog/addblog">
                      Add Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog/yourblog">
                      Your Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog/yourlikes">
                      Your Likes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/notify">
                      Notification
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/livechat">
                      LiveChat
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={logoutUser}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/user/signup">
                      Create Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/user/signin">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

