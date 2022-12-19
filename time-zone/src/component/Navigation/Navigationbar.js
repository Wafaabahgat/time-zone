// import navigation bar css
import "./navigationbar.css";
import { Link, useLocation } from "react-router-dom";

const Navigationbar = () => {
  const router = useLocation();
  const isActive = (r) => {
    if (r === router.pathname) {
      return "#e12a6a";
    } else {
      return "#e8e8e8";
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          Time Zone
        </Link>
        <nav className="header__list">
          <Link
            className="header__listChild"
            style={{ color: isActive("/") }}
            to={`/`}
          >
            Dashboard
          </Link>
          {user ? (
            <p className="header__listChild">
              Hello, <span>{user.name}</span>
            </p>
          ) : (
            <Link
              className="header__listChild"
              style={{ color: isActive("/login") }}
              to={`/login`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};
export default Navigationbar;
