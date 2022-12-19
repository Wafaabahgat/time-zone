import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../login/login";
import Signup from "../sign up/Signup";
// import css
import "./loginSignupContainer.css";

const LoginSignupContainer = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  // define state to make sure if login or signup is clicked  or visiable or active
  const [login, setLogin] = useState(true);

  //   creating reference for login-signup-container
  const LoginSignupContainerRef = useRef(null);

  const handleClick = () => {
    setLogin(!login);

    // using useRef we can do DOM manuplation
    LoginSignupContainerRef.current.classList.toggle("active");
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate('/')
  //   }
  // }, [user, navigate])

  return (
    <div class="login-signup-container" ref={LoginSignupContainerRef}>
      <Login />
      <div class="side-div">
        <button type="button" onClick={handleClick}>
          {" "}
          {login ? "Signup" : "Login"}
        </button>
      </div>
      <Signup />
    </div>
  );
};
export default LoginSignupContainer;
