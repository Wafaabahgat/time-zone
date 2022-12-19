import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const router = useLocation();
  const isActive = (r) => {
    if (r === router.pathname) {
      return {
        backgroundColor: "#e61b73",
        color: `#fff`,
      };
    } else {
      return {
        backgroundColor: "#f6f6f6",
        color: "#333",
      };
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    window.location = "/login";
  };
  return (
    <div className="sidebar">
      <div className="sid__container">
        <div className="sid__logo">Logo</div>
        <nav>
          <Link style={isActive("/")} to={`/`}>
            dashboard
          </Link>
          {user === 2 ? (
            <Link style={isActive("/users")} to={`/users`}>
              users
            </Link>
          ) : (
            ""
          )}

          <Link style={isActive("/timezone")} to={`/timezone`}>
            TimeZone
          </Link>
          {user ? <button onClick={handleLogout}>Logout</button> : ""}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
