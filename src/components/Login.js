import React, {useContext, useState} from 'react'
import { UserContext } from '../context/user';

export default function Login() {
    const {user, setUser} = useContext(UserContext);
    const [errors, setErrors] = useState(false)
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    })
    const URL = 'https://mapbook-memories-backend.herokuapp.com'
    const handleChange = (e) =>{
        setUserLogin({...userLogin, [e.target.name]:e.target.value})
    }
    // console.log(process.env.REACT_APP_BACKEND_URL)
    // Login and begin current_user session.
    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch(`${URL}/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(userLogin)
        }).then(res=>{
            if(res.ok){
                res.json().then(data => {
                    
                    setUser(data)})
            } else{
                res.json().then(data => {
                    setErrors(data.errors.slice(0))
                    setTimeout(() => setErrors(false), 5000);
                })
            }
        })
    }
    return (
        // render login form.
        <div>
            <form onSubmit={handleSubmit} style={{margin: 'auto', 'maxWidth': '800px', 'textAlign': 'center', "fontFamily": 'Georgia'}}>

                <label className='form-label mt-3'>Username:</label>

                <input 
                type='text' 
                name="username" 
                className='form-control border-dark'  
                onChange={handleChange} 
                ></input>

                <label className='form-label mt-3'>Password:</label>

                <input 
                type='password' 
                name="password" 
                className='form-control border-dark'  
                onChange={handleChange} 
                autoComplete="on"
                ></input>
            {errors? errors.map(err=><p  className="alert-danger m-1">*{err}.</p>):null}
                <div style={{textAlign: 'center'}} className='mt-3'>
                    <button className='btn btn-dark'>Login</button>
                </div>
            </form>
            
        </div>
    )
}

