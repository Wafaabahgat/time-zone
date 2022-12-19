import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaUserAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = ({ token }) => {
  const [data, setdata] = useState({});
  const getUsers = () => {
    axios
      .get(`https://92.205.22.71:8001/api/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setdata(res.data?.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="dash">
      <div className="dash__container">
        <h2>dashboard</h2>
        <div>
          <div className="card__container">
            {data.length &&
              data.map((e) => (
                <div className="card">
                  <div className="card__head">
                    <p style={{ backgroundColor: "#bfdbfe" }}>
                      {e.name === "Users" ? (
                        <FaUserAlt
                          fontSize={24}
                          color={"#3b82f6"}
                          style={{ margin: "8px 4px" }}
                        />
                      ) : (
                        <BiTime
                          fontSize={30}
                          color={"#3b82f6"}
                          style={{ margin: "8px 4px" }}
                        />
                      )}
                    </p>
                    <span>{e.name}</span>
                  </div>
                  <h2>{e.today}</h2>
                  <p>{e.total} Timezones As Total</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
