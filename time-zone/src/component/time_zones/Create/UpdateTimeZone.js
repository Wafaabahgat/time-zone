import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../users/createUser/style.css";

const UpdateTimeZone = ({ token }) => {
  const navigate = useNavigate();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setname] = useState("");
  const [city_name, setcity_name] = useState("");
  const [gmt_diff, setgmt_diff] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://92.205.22.71:8001/api/timezones/${params.id}`,
        {
          name: name,
          city_name: city_name,
          gmt_diff: gmt_diff,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success("timezone Updated succesfully");
          navigate("/timezone");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getSingleUser = () => {
    axios
      .get(`https://92.205.22.71:8001/api/timezones/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          let us = res.data.data;
          setname(us?.name);
          setcity_name(us?.city_name);
          setgmt_diff(us?.gmt_diff);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="user">
      <div className="user__container">
        <h2>Udate timezone</h2>
        <form onSubmit={handleSubmit} className="card flex-col">
          <TextField
            value={name}
            onChange={(e) => setname(e.target.value)}
            variant="outlined"
            label="Name"
          />
          <TextField
            value={city_name}
            onChange={(e) => setcity_name(e.target.value)}
            variant="outlined"
            label="City Name"
          />
          <TextField
            value={gmt_diff}
            onChange={(e) => setgmt_diff(e.target.value)}
            variant="outlined"
            label="Difference in hours"
            type={"number"}
          />
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTimeZone;
