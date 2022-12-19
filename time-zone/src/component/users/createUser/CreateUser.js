import { Button, MenuItem, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

const CreateUser = ({token}) => {
    const navigate = useNavigate()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [role, setrole] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(
            `https://92.205.22.71:8001/api/users`,
            {
                "name": name,
                "email": email,
                "password": password,
                "role": role
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(res => {
            if (res.data.success === true) {
                toast.success('User added succesfully')
                navigate('/users')
            }
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }
  return (
    <div className="user">
        <div className="user__container">
            <h2>Create user</h2>
            <form onSubmit={handleSubmit} className='card flex-col'>
                <TextField value={name} onChange={(e) => setname(e.target.value)} variant='outlined' label="Name" />
                <TextField value={email} onChange={(e) => setemail(e.target.value)} variant='outlined' label="Email" type={'email'} />
                <TextField value={password} onChange={(e) => setpassword(e.target.value)} variant='outlined' label="Password" type={'password'} />
                <TextField value={role} onChange={(e) => setrole(e.target.value)} variant='outlined' label="Role" select >
                    <MenuItem value={0}>user</MenuItem>
                    <MenuItem value={1}>Management</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                </TextField>
                <Button type='submit' variant='contained' color='secondary'>Submit</Button>
            </form>
        </div>
    </div>
  )
}

export default CreateUser