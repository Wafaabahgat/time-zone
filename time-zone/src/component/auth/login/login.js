// import css
import "./login.css";
// axios
import axios from "axios";
import { useState } from "react";
// router dom
import { useNavigate } from "react-router-dom";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  // this function is for axios when trying to login
  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData()
    // formData.append('email', email)
    // formData.append('password', pass)

    axios
      .post("https://92.205.22.71:8001/api/auth/login", {
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Login succesfully");
          localStorage.setItem("user", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // this function is to navigate to home page
  // const navigator = (e) => {
  //   e.preventDefault()

  //   localStorage.setItem('user', {'email': email, 'pass': pass})
  //   navigate('/')
  // }
  return (
    <div class="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={"email"}
          placeholder={"Email"}
        />
        <input
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          type={"password"}
          placeholder={"Password"}
        />
        <button type={"submit"}>Login</button>
      </form>
    </div>
  );
};
export default Login;
