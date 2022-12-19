import "./App.css";
import Navigationbar from "./component/Navigation/Navigationbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./component/Pages/Dashboard";
import Users from "./component/users/Users";
import Sidebar from "./component/Sidebar/Sidebar";
import { useEffect } from "react";
import CreateUser from "./component/users/createUser/CreateUser";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./component/users/createUser/UpdateUser";
import LoginSignupContainer from "./component/auth/loginSignupContainer/LoginSignupContainer";
import TimeZones from "./component/time_zones/TimeZones";
import CreateTimeZone from "./component/time_zones/Create/CreateTimeZone";
import UpdateTimeZone from "./component/time_zones/Create/UpdateTimeZone";

const App = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token") || '';

  useEffect(() => {
    if (user) {
      return
    } else {
      navigate('/login')
    }
  }, [user, navigate])
  

  return (
    <div className="app">
      {/* show toast when sucess or fail */}
      <ToastContainer />
      <Navigationbar />
      <div className="app__container">
        {
          user ? <Sidebar /> : ''
        }
        <Routes>
          {/* Login */}
            <Route path="/login" element={<LoginSignupContainer />} />
          {/* Home */}
            <Route path="/" element={<Dashboard token={token} />} />
          {/* Users */}
          {
            user?.role === 2 ? (
              <>
                <Route path="/users" element={<Users token={token} />} />
                <Route path="/users/add" element={<CreateUser token={token} />} />
                <Route path="/users/edit/:id" element={<UpdateUser token={token} />} />
              </>
            ) : ''
          }
          {/* Time zones */}
            <Route path="/timezone" element={<TimeZones token={token} />} />
            <Route path="/timezones/add" element={<CreateTimeZone token={token} />} />
            <Route path="/timezones/edit/:id" element={<UpdateTimeZone token={token} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
