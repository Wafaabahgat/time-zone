// import css
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  // this function is for axios when trying to login
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://92.205.22.71:8001/api/auth/signup", {
        name: name,
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Register succesfully");
          localStorage.setItem("user", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div class="signup">
      <h1>Create a New Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type={"text"}
          placeholder={"Your Name"}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={"email"}
          placeholder={"Your Email"}
        />
        <input
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          type={"password"}
          placeholder={"Your Password"}
        />
        <input type={"password"} placeholder={"confirm Password"} />
        <button type={"submit"}>Signup</button>
      </form>
    </div>
  );
};
export default Signup;
