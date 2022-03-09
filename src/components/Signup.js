import React, { useContext, useState } from "react";
import { UserContext } from '../context/user';


export default function Signup() {
    const {user, setUser} = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [errors, setErrors] = useState(false)
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })

    }
    // console.log(`${process.env.REACT_APP_BACKEND_URL}/signup`)
    // Add New User to the Database and Backend.
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://mapbook-memories-backend.herokuapp.com/signup`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => setUser(data))
            } else {
                res.json().then(data => {
                    let email = data.errors.filter(error => error.includes('Email'))
                    let username = data.errors.filter(error => error.includes('Username'))
                    let password = data.errors.filter(error => error.includes('Password'))
                    console.log(email)
                    console.log(password)
                    console.log(username)
                    setErrors({
                        password: password,
                        username: username,
                        email: email
                    })
                    setTimeout(() => setErrors(false), 10000);
                })
            }

        })
    }
    return (
        // Render for for New User to be added to backend with error handling.
        <div>

            <form onSubmit={(e) => handleSubmit(e)} style={{ margin: 'auto', 'maxWidth': '800px', 'textAlign': 'center', "fontFamily": 'Georgia' }}>

                <label className='form-label mt-3'>Username</label>

                <input
                    className='form-control border-dark'
                    name='username'
                    onChange={(e) => handleChange(e)}
                ></input>

                {errors ? errors.username.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}

                <label className='form-label mt-3'>Email</label>

                <input
                    className='form-control border-dark'
                    name='email'
                    onChange={(e) => handleChange(e)}
                ></input>

                {errors ? errors.email.map(err => <p className="alert-danger m-1">*{err}.</p>) : null}

                <label className='form-label mt-3'>Password</label>

                <input
                    className='form-control border-dark'
                    type='password'
                    name='password'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                ></input>
                <label className='form-label mt-3'>Password Confirmation</label>

                <input
                    className='form-control border-dark'
                    type='password'
                    name='password_confirmation'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                ></input>

                {errors ? errors.password.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}

                <div style={{ textAlign: 'center' }} className='mt-3'>
                    <button className='btn btn-dark mt-3'>Signup</button>
                </div>
            </form>

        </div>
    )
}
