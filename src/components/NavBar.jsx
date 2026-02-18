import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function NavBar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-6 z-50 flex justify-center">
      <div className="
        relative
        w-[92%] max-w-6xl
        h-[68px]
        px-6
        flex items-center justify-between
        rounded-2xl
        bg-slate-800/30
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      ">

        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide text-white">
          MovixHub
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm">

          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          <Link to="/search" className="hover:text-white transition">
            Search
          </Link>

          <Link to="/favorites" className="hover:text-white transition">
            Favorites
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-9 h-9 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="
                    w-9 h-9
                    rounded-full
                    bg-red-600
                    flex items-center justify-center
                    text-sm font-medium text-white
                  ">
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                )}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="
                  absolute right-0 mt-4
                  w-48
                  bg-slate-900/80
                  backdrop-blur-xl
                  border border-white/10
                  rounded-xl
                  shadow-2xl
                  py-2
                  text-sm
                ">
                  <div className="px-4 py-2 text-gray-400 border-b border-white/10">
                    {user.displayName || user.email}
                  </div>

                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 text-gray-300"
                  >
                    Profile
                  </button>

                  <div className="px-4 py-2 hover:bg-white/5 text-gray-300">
                    <Logout />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  px-4 py-2
                  rounded-xl
                  bg-red-600
                  hover:bg-red-500
                  text-white
                  transition
                "
              >
                Sign Up
              </Link>
            </div>
          )}

        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="
          absolute top-[100px]
          w-[92%] max-w-6xl
          bg-slate-900/90
          backdrop-blur-xl
          border border-white/10
          rounded-2xl
          shadow-2xl
          py-6
          px-6
          flex flex-col gap-6
          text-gray-300
          md:hidden
        ">
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/search" onClick={() => setMobileOpen(false)}>Search</Link>
          <Link to="/favorites" onClick={() => setMobileOpen(false)}>Favorites</Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <div className="pt-4 border-t border-white/10">
              <Logout />
            </div>
          )}
        </div>
      )}

    </nav>
  );
}

export default NavBar;
