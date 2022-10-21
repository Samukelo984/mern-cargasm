import "./Navbar.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:8000/imageStorage/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className="nav">
      <article className="nav-left">
        <span className="fa-brands fa-square-facebook"></span>
        <span className="fa-brands fa-square-instagram"></span>
        <span className="fa-brands fa-square-twitter"></span>
        <span className="fa-brands fa-square-pinterest"></span>
      </article>
      <nav className="nav-center">
        <ul>
          <Link to="/" className="link">
            <li> HOME </li>
          </Link>
          <Link to="/about" className="link">
            <li> ABOUT </li>
          </Link>
          <Link to="/contact" className="link">
            <li> CONTACT </li>
          </Link>
          <Link to="/write" className="link">
            <li> WRITE </li>
          </Link>
          {user && <li onClick={handleLogout}> LOGOUT </li>}
        </ul>
      </nav>
      <article className="nav-right">
        {user ? (
          <img src={publicFolder + user.profilePicture} alt="profile avatar" />
        ) : (
          <nav className="nav-center">
            <ul>
              <li>
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/register" className="link">
                  REGISTER
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <Link to="/settings">
          <span className="fa-solid fa-gear"></span>
        </Link>
      </article>
    </header>
  );
};

export default Navbar;
