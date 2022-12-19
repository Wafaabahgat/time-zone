import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import "../users/Users.css";

const TimeZones = ({ token }) => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`https://92.205.22.71:8001/api/timezones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          getUsers();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 70, flex: 0.2 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.2 },
    { field: "city_name", headerName: "City_name", minWidth: 120, flex: 0.2 },
    { field: "gmt_diff", headerName: "gmt_diff", minWidth: 120, flex: 0.2 },
    { field: "created_at", headerName: "Created_at", minWidth: 140, flex: 0.2 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "8px",
              fontSize: "18px",
              alignItems: "center",
            }}
          >
            <Link
              to={`/timezones/edit/${params.getValue(params.id, "id")}`}
              style={{ color: "green" }}
            >
              <FaEdit fontSize="large" />
            </Link>
            <button
              onClick={() => handleDelete(params.getValue(params.id, "id"))}
              style={{ color: "red" }}
            >
              <FaTrashAlt fontSize="large" />
            </button>
          </div>
        );
      },
    },
  ];
  const rows = [];
  users?.length &&
    users?.forEach((p) =>
      rows.push({
        id: p?.id,
        name: p?.name,
        city_name: p?.city_name,
        gmt_diff: p?.gmt_diff,
        created_at: p?.createdAt.slice(0, 10),
      })
    );

  const getUsers = () => {
    axios
      .get(`https://92.205.22.71:8001/api/timezones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setusers(res.data?.data);
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
    <div className="user">
      <div className="user__container">
        <h2>Timezones</h2>
        <Link to={`/timezones/add`} className="user__create">
          Add Timezone +
        </Link>
        {/* <div className='user__filter'>
          <input type="text" placeholder='Name' />
          <button>Filter</button>
        </div> */}
        <div
          style={{
            margin: "20px 0",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default TimeZones;
