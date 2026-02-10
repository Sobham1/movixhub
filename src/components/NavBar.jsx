import { Link } from "react-router-dom";
import "../css/Navbar.css";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">MovixHub 🎬</div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <svg className="nav-icon" viewBox="0 0 24 24">
            <path
              d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
              fill="currentColor"
            />
          </svg>
          Home
        </Link>

        <Link to="/search" className="nav-link">
          <svg className="nav-icon" viewBox="0 0 24 24">
            <path
              d="M10 2a8 8 0 105.293 14.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0010 2z"
              fill="currentColor"
            />
          </svg>
          Search
        </Link>

        <Link to="/favorites" className="nav-link">
          <svg className="nav-icon" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
              4.42 3 7.5 3c1.74 0 3.41 0.81 
              4.5 2.09C13.09 3.81 14.76 3 
              16.5 3 19.58 3 22 5.42 
              22 8.5c0 3.78-3.4 6.86-8.55 
              11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
          Favorites
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24">
                <path
                  d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a4 4 0 100 8 4 4 0 000-8zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
              Login
            </Link>

            <Link to="/signup" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24">
                <path
                  d="M15 14c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 
                  1.34-3 3 1.34 3 3 3zm-6 
                  0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 
                  1.34-3 3 1.34 3 3 3zm3 2c-2.33 
                  0-7 1.17-7 3.5V22h14v-2.5c0-2.33-4.67-3.5-7-3.5z"
                  fill="currentColor"
                />
              </svg>
              Signup
            </Link>
            <Link to="/about" className="nav-link">
              {/* Optional SVG icon here */}
              About
            </Link>
          </>
        ) : (
          <>
            <span className="welcome-msg">
              Welcome, {user.email.split("@")[0]} 👋
            </span>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
